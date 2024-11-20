import { UnitSingleQuestionDetails, UnitMatchupQuestionDetails } from '@/datacontracts/Question'
import { UnitDisplay } from '../units/unitDisplay'
import { QuestionProps } from './questionMap'

export const QuestionUnitSingle = ({ _details }: QuestionProps) => {
    const details: UnitSingleQuestionDetails = UnitSingleQuestionDetails.parse(_details)

    return <UnitDisplay unit={details.unit} />
}

export const QuestionUnitMatchup = ({ _details }: QuestionProps) => {
    const details: UnitMatchupQuestionDetails = UnitMatchupQuestionDetails.parse(_details)

    return (
        <div className='flex flex-col'>
            <h2 className='mb-4'>Matchup between</h2>
            <div className='flex'>
                <>
                    {details.friendlyUnits.map((unit) => (
                        <UnitDisplay key={unit.name} unit={unit} />
                    ))}
                </>
                <p className='h5Style'>vs.</p>
                <>
                    {details.enemyUnits.map((unit) => (
                        <UnitDisplay key={unit.name} unit={unit} />
                    ))}
                </>
            </div>
        </div>
    )
}
