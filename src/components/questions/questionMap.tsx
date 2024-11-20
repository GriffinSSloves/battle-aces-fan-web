import { QuestionDetails, QuestionKind } from '@/datacontracts/Question'
import { QuestionUnitSingle } from './questionUnitSingle'
import { QuestionUnitMatchup } from './questionUnitMatchup'

export interface QuestionProps {
    _details: QuestionDetails
}

export const QuestionMap: Record<QuestionKind, React.FC<QuestionProps>> = {
    unit_single: QuestionUnitSingle,
    unit_matchup: QuestionUnitMatchup
}
