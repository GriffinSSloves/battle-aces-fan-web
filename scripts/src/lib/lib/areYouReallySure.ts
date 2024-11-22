import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'
import chalk from 'chalk'

export const areYouReallySure = async (question: string): Promise<boolean> => {
    const rl = readline.createInterface({ input, output })
    const questionHelp = `Type 'y' or 'yes' to continue. Type anything else to cancel.`
    const answer = await rl.question(`${chalk.magenta(question)}\n${chalk.yellowBright(questionHelp)}\n`)

    rl.close()

    const lowerCased = answer.toLowerCase()
    return lowerCased === 'y' || lowerCased === 'yes'
}
