import { UnitMatchupQuestionDetails } from '@/datacontracts/Question'
import { UnitDisplay } from '../units/unitDisplay'
import { QuestionProps } from './questionMap'

export const QuestionUnitMatchup = ({ _details }: QuestionProps) => {
    const details: UnitMatchupQuestionDetails = UnitMatchupQuestionDetails.parse(_details)

    return (
        <div className='flex items-center w-full'>
            <div className='flex-1 flex justify-end gap-4 pr-4'>
                {details.friendlyUnits.map((unit) => (
                    <UnitDisplay key={unit.name} unit={unit} />
                ))}
            </div>

            <div className='flex-none'>
                <p className='h3Style'>vs.</p>
            </div>

            <div className='flex-1 flex justify-start gap-4 pl-4'>
                {details.enemyUnits.map((unit) => (
                    <UnitDisplay key={unit.name} unit={unit} />
                ))}
            </div>
        </div>
    )
}
