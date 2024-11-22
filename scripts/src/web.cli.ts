import { Command } from 'commander'
import { releaseCommand as releaseCommand } from './lib/commands/release.js'
import { inspect } from 'util'

export const aceWebReleaseCli = new Command().description('BattleAcesFan web app cli').addCommand(releaseCommand)

aceWebReleaseCli.parseAsync().catch((error) => {
    console.error('BattleAcesFan web cli command failed with error', inspect(error, { depth: null, colors: true }))
    process.exit(1)
})
