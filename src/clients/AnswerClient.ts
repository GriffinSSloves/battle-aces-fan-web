import { IHttpClient } from './HttpClient'

export interface IAnswerClient {
    submitAnswer: (answer: string) => Promise<void>
}

export class AnswerClient implements IAnswerClient {
    constructor(private readonly userHttpClient: IHttpClient) {}

    submitAnswer = async (answer: string): Promise<void> => {
        console.log(`Submitting answer: ${answer}`)

        await this.userHttpClient.post('/answers', answer)
    }
}
