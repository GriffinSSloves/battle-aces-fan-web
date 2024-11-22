import { envProvider } from './EnvProvider'
import { releaser } from './releaser'
import assert from 'assert'

const test_utils = async () => {
    const rootDir = await releaser.getRootDir()
    console.log('rootDir', rootDir)
}

const test_bumpVersion = async () => {
    const withoutEnvSuffix = async () => {
        const version = await releaser.bumpVersion({ version: '1.0.0' })

        assert(version === '1.0.1-dev', 'bumpVersion failed')

        const next = await releaser.bumpVersion({ version: '1.0.1-dev' })

        assert(next === '1.0.2-dev', 'bumpVersion failed')
    }

    const withEnvSuffix = async () => {
        const version = await releaser.bumpVersion({ version: '1.0.0-dev' })

        assert(version === '1.0.1-dev', 'bumpVersion failed')

        const next = await releaser.bumpVersion({ version: '1.0.1-dev' })

        assert(next === '1.0.2-dev', 'bumpVersion failed')
    }

    await withoutEnvSuffix()
    await withEnvSuffix()
}

const run = async () => {
    await envProvider.getEnv()
    await envProvider.getRootDir()
}

run()
