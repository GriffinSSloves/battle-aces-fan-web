import { Question } from '@/datacontracts/Question'
import { IHttpClient } from './HttpClient'

export interface IQuestionClient {
    getQuestions: () => Promise<Question[]>
}

export class QuestionClient implements IQuestionClient {
    route = '/questions'

    constructor(private readonly httpClient: IHttpClient) {}

    getQuestions = async (): Promise<Question[]> => {
        return [
            {
                kind: 'unit_single',
                details: {
                    kind: 'unit_single',
                    unitName: 'Behemoth'
                }
            }
        ]
    }
}
