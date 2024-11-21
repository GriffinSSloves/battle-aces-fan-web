import { IHttpClient } from './HttpClient'
import { UserApiClient } from '@battle-aces-fan/user-clients'

export interface IAnswerClient {
    submitAnswer: (answer: string) => Promise<void>
}

export class AnswerClient implements IAnswerClient {
    constructor(
        private readonly userApiClient: UserApiClient,
        private readonly userId: string
    ) {}

    submitAnswer = async (answer: string): Promise<void> => {
        console.log(`Submitting answer: ${answer}`)
    }
}
