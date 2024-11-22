import { SurveyQuestionResponseSchema } from '@battle-aces-fan/datacontracts'
import { IHttpClient } from './HttpClient'
import { UserApiClient } from '@battle-aces-fan/user-clients'
import { UserSubmitResponseSchema } from '@/components/answer/answerForm'

export interface IAnswerClient {
    postAnswer: (questionResponse: UserSubmitResponseSchema) => Promise<boolean>
}

export class AnswerClient implements IAnswerClient {
    constructor(
        private readonly userApiClient: UserApiClient,
        private readonly userId: string
    ) {}

    postAnswer = async (questionResponse: UserSubmitResponseSchema): Promise<boolean> => {
        const response = await this.userApiClient.users.responses[':userId'].$post({
            param: { userId: this.userId },
            json: questionResponse
        })

        if (!response.ok) {
            return false
        }

        const json = await response.json()

        return json.success
    }
}
