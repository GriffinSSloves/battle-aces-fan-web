import { QuestionDetails, QuestionKind } from '@/datacontracts/Question'
import { QuestionUnitSingle, QuestionUnitMatchup } from './questionUnitSingle'

export interface QuestionProps {
    _details: QuestionDetails
}

export const QuestionMap: Record<QuestionKind, React.FC<QuestionProps>> = {
    unit_single: QuestionUnitSingle,
    unit_matchup: QuestionUnitMatchup
}
