import { QuestionUnitSingle } from './questionUnitSingle'
import { QuestionUnitMatchup } from './questionUnitMatchup'
import { SurveyQuestionDetails, SurveyQuestionKind } from '@battle-aces-fan/datacontracts'
import { QuestionBasic } from './questionBasic'

export interface QuestionProps {
    _details: SurveyQuestionDetails
}

export const QuestionMap: Record<SurveyQuestionKind, React.FC<QuestionProps>> = {
    unit_single: QuestionUnitSingle,
    unit_matchup_1v1: QuestionUnitMatchup,
    basic: QuestionBasic
}
