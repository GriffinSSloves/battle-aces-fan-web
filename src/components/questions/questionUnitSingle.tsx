import { UnitSingleQuestionDetails, UnitMatchupQuestionDetails } from '@/datacontracts/Question'
import { UnitDisplay } from '../units/unitDisplay'
import { QuestionProps } from './questionMap'

export const QuestionUnitSingle = ({ _details }: QuestionProps) => {
    const details: UnitSingleQuestionDetails = UnitSingleQuestionDetails.parse(_details)

    return <UnitDisplay unit={details.unit} />
}
