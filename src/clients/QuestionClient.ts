import { Question } from '@/datacontracts/Question'
import { IHttpClient } from './HttpClient'
import { getMockUnit, getMockUnit2 } from './UnitClient'

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
                    unit: getMockUnit()
                }
            },
            {
                kind: 'unit_matchup',
                details: {
                    kind: 'unit_matchup',
                    friendlyUnits: [getMockUnit()],
                    enemyUnits: [getMockUnit2()]
                }
            }
        ]
    }
}
