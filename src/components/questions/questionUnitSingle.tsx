import { UnitDisplay } from '../units/unitDisplay'
import { QuestionProps } from './questionMap'
import { SurveyQuestion_UnitSingleSchema } from '@battle-aces-fan/datacontracts'

export const QuestionUnitSingle = ({ _details }: QuestionProps) => {
    const details: SurveyQuestion_UnitSingleSchema = SurveyQuestion_UnitSingleSchema.parse(_details)

    return <UnitDisplay unitSlug={details.unitSlug} />
}
