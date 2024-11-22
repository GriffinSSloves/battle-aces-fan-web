import { Command } from 'commander'
import { releaser } from '../releaser.js'
import chalk from 'chalk'
import { areYouReallySure } from '../lib/areYouReallySure.js'

// make sure to run gcloud auth configure-docker us-west2-docker.pkg.dev
export const releaseCommand = new Command()
    .command('release')
    .description(`Used to release to web using gcloud`)
    .action(async () => {
        const config = releaser.releaseConfig
        console.log(chalk.blueBright(`Current release config: ${JSON.stringify(config, null, 2)} \n`))

        const reallySure = await areYouReallySure('Are you sure you want to release with the current config?')

        if (!reallySure) {
            console.log(chalk.red('Phew! Exiting release...'))
            process.exit(1)
        }

        console.log(chalk.green('Starting release...'))

        await releaser.basicBuild()

        console.log(chalk.green('Release complete!'))

        process.exit(0)
    })

export const testBuildCommand = new Command()
    .command('test-build')
    .description(`Test the docker build without releasing`)
    .action(async () => {
        const config = releaser.releaseConfig
        console.log(chalk.blueBright(`Current release config: ${JSON.stringify(config, null, 2)} \n`))

        console.log(chalk.green('Starting test release...'))

        await releaser.testBuild()

        console.log(chalk.green('Release complete!'))

        process.exit(0)
    })
