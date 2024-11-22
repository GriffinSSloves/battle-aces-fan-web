import { exec, spawn } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import os from 'os'
import assert from 'assert'
import { config } from 'dotenv'
import semver from 'semver'
import chalk from 'chalk'
import { envProvider } from './EnvProvider.js'

envProvider.loadEnv()

const execAsync = promisify(exec)

const loadPackageJson = async () => {
    const rootDir = envProvider.getRootDir()
    const packageJsonPath = path.join(rootDir, 'package.json')
    const packageJson = await fs.promises.readFile(packageJsonPath, 'utf-8')
    return JSON.parse(packageJson)
}

const savePackageJson = async (packageJson: any) => {
    const rootDir = envProvider.getRootDir()
    const packageJsonPath = path.join(rootDir, 'package.json')
    await fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

const bumpVersion = (current: { version: string }) => {
    const currentVersion = current.version

    if (currentVersion.split('-').length > 2) {
        throw new Error('Invalid version format?! max one hyphen allowed in version string')
    }

    const versionWithoutSuffix = currentVersion.split('-')[0]

    const asSemVer = semver.parse(versionWithoutSuffix)
    assert(asSemVer, 'Invalid semver version')

    const bumped = asSemVer.inc('patch')

    const asVersionString = bumped.version

    return asVersionString
}

const bumpPackageJsonVersion = async () => {
    const packageJson = await loadPackageJson()
    const newVersion = bumpVersion(packageJson)

    packageJson.version = newVersion

    await savePackageJson(packageJson)
    return newVersion
}

const createDockerImageTag = (version: string) => {
    return `${envProvider.constants.artifactRegistry}/${envProvider.constants.gcloudServiceName}:${version}`
}

const getDockerBuildCommand = async (tag: string) => {
    const command = `docker build -t ${tag} .`

    return command
}

const streamExec = (command: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const execHandle = exec(command)

        execHandle.stdout?.on('data', (data) => {
            console.log(data.toString())
        })

        execHandle.stderr?.on('data', (data) => {
            console.error(data.toString())
        })

        execHandle.on('close', (code) => {
            if (code === 0) {
                resolve()
            } else {
                reject(new Error(`Command failed with exit code ${code}`))
            }
        })
    })
}

/**
 *
 * @param imageUri e.g. us-west2-docker.pkg.dev/foxtail-362109/foxtail-web/foxtail-test-web:1.0.0-dev
 */
const deployToCloudRun = async (imageUri: string) => {
    console.log('Deploying to cloud run: imageUri', imageUri)
    const command = `gcloud run deploy ${envProvider.constants.gcloudServiceName} --image ${imageUri} --region us-west2`
    console.log('command that would be run: ', command)

    // const result = await streamExec(command)
    const result = ''

    return result
}

const setVITE_APP_VERSION = async (version: string) => {
    const rootDir = envProvider.getRootDir()
    const envFile = path.join(rootDir, '.env')

    const envVar = `VITE_APP_VERSION=${version}`

    const existingEnv = await fs.promises.readFile(envFile, 'utf-8')
    const lines = existingEnv.split('\n')

    const existingVITE_APP_VERSION = lines.find((line) => line.startsWith('VITE_APP_VERSION='))
    if (existingVITE_APP_VERSION) {
        const index = lines.indexOf(existingVITE_APP_VERSION)
        lines[index] = envVar
    } else {
        lines.push(envVar)
    }

    const fullEnvVile = lines.join('\n')

    await fs.promises.writeFile(envFile, fullEnvVile)
}

const docker = {
    createDockerImageTag,
    getDockerBuildCommand
}

const runBuild = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const rootDir = envProvider.getRootDir()
        const currentDirectory = process.cwd()

        // Change to root directory
        process.chdir(rootDir)

        // Use pnpm and spawn instead of exec
        const build = spawn('pnpm', ['exec', 'vite', 'build'], {
            stdio: 'inherit',
            shell: true,
            env: {
                ...process.env,
                NODE_OPTIONS: '--max-old-space-size=8192'
            }
        })

        build.on('close', (code) => {
            // Always change back to original directory
            process.chdir(currentDirectory)

            if (code === 0) {
                resolve()
            } else {
                reject(new Error(`Build process exited with code ${code}`))
            }
        })

        build.on('error', (err) => {
            // Always change back to original directory
            process.chdir(currentDirectory)
            reject(err)
        })
    })
}

const logInfo = (message: string, objects: any = null) => {
    if (objects) {
        // console.log(chalk.green(message), objects);
    } else {
        // console.log(chalk.green(message));
    }
}

const basicBuild = async () => {
    logInfo('Running pnpm build')

    await runBuild()

    logInfo('Bumping package.json version')
    const version = await bumpPackageJsonVersion()
    logInfo('New package.json version:', version)

    logInfo('Creating docker image tag')
    const tag = createDockerImageTag(version)
    logInfo('Docker image tag:', tag)

    logInfo('Setting VITE_APP_VERSION', version)
    await setVITE_APP_VERSION(version)

    const buildCommand = await getDockerBuildCommand(tag)
    logInfo('Building docker image with command:', buildCommand)

    logInfo('Building docker image...')
    await streamExec(buildCommand)

    logInfo('Pushing docker image to artifact registry...')
    await streamExec(`docker push ${tag}`)

    logInfo('Starting to deploy to cloud run...')
    await deployToCloudRun(tag)

    return tag
}

export const releaser = {
    get constants() {
        return envProvider.constants
    },
    get releaseConfig() {
        return {
            env: envProvider.getEnv(),
            rootDir: envProvider.getRootDir()
        }
    },
    basicBuild,
    docker,
    deployToCloudRun,
    getRootDir: envProvider.getRootDir,
    bumpVersion,
    bumpPackageJsonVersion
}
