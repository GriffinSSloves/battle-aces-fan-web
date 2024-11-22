import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import os from 'os'
import assert from 'assert'
import { config } from 'dotenv'
import semver from 'semver'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const loadEnv = () => {
    return config({
        path: path.join(__dirname, '../../../.env')
    }).parsed
}

const getRootDir = () => {
    const p = path.resolve(__dirname, '../../../')

    const packageJsonPath = path.join(p, 'package.json')

    if (fs.existsSync(packageJsonPath)) {
        return p
    } else {
        throw new Error('Root directory not found: ' + p)
    }
}

const getEnv = () => {
    const envObj = loadEnv() as any
    const gcloudServiceName: string = envObj.GCLOUD_SERVICE_NAME
    const artifactRegistry: string = envObj.ARTIFACT_REGISTRY
    return {
        gcloudServiceName,
        artifactRegistry
    }
}

export const envProvider = {
    loadEnv,
    getEnv,
    getRootDir,
    get constants() {
        const constants = {
            artifactRegistry: getEnv().artifactRegistry,
            gcloudServiceName: getEnv().gcloudServiceName
        } as const
        return constants
    }
} as const
