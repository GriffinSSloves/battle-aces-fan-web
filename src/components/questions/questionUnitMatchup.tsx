import { UnitDisplay } from '../units/unitDisplay'
import { QuestionProps } from './questionMap'
import { SurveyQuestion_UnitMatchupSchema } from '@battle-aces-fan/datacontracts'

export const QuestionUnitMatchup = ({ _details }: QuestionProps) => {
    const details: SurveyQuestion_UnitMatchupSchema = SurveyQuestion_UnitMatchupSchema.parse(_details)

    return (
        <div className='flex items-center w-full'>
            <div className='flex-1 flex justify-end gap-4 pr-4'>
                <UnitDisplay unitSlug={details.firstUnitSlug} />
            </div>

            <div className='flex-none'>
                <p className='h3Style'>vs.</p>
            </div>

            <div className='flex-1 flex justify-start gap-4 pl-4'>
                <UnitDisplay unitSlug={details.secondUnitSlug} />
            </div>
        </div>
    )
}
