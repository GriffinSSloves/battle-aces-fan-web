import { SurveyQuestion } from '@battle-aces-fan/datacontracts'
import { UserApiClient } from '@battle-aces-fan/user-clients'

export interface IQuestionClient {
    getQuestions: () => Promise<SurveyQuestion[]>
}

export class QuestionClient implements IQuestionClient {
    route = '/questions'

    constructor(
        private readonly userApiClient: UserApiClient,
        private readonly userId: string
    ) {}

    getQuestions = async (): Promise<SurveyQuestion[]> => {
        const response = await this.userApiClient.users.questions[':userId'].$get({
            param: { userId: this.userId }
        })

        const questions = await response.json()

        return questions.questions.map((question) => new SurveyQuestion(question))
    }
}
