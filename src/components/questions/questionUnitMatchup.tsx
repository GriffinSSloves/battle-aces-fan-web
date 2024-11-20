import { UnitMatchupQuestionDetails } from '@/datacontracts/Question'
import { UnitDisplay } from '../units/unitDisplay'
import { QuestionProps } from './questionMap'

export const QuestionUnitMatchup = ({ _details }: QuestionProps) => {
    const details: UnitMatchupQuestionDetails = UnitMatchupQuestionDetails.parse(_details)

    return (
        <div className='flex flex-col'>
            <div className='flex items-center'>
                <>
                    {details.friendlyUnits.map((unit) => (
                        <UnitDisplay key={unit.name} unit={unit} />
                    ))}
                </>
                <p className='h3Style'>vs.</p>
                <>
                    {details.enemyUnits.map((unit) => (
                        <UnitDisplay key={unit.name} unit={unit} />
                    ))}
                </>
            </div>
        </div>
    )
}
