import { UnitDisplay } from '../units/unitDisplay'
import { QuestionProps } from './questionMap'
import { SurveyQuestion_BasicSchema } from '@battle-aces-fan/datacontracts'

export const QuestionBasic = ({ _details }: QuestionProps) => {
    const details: SurveyQuestion_BasicSchema = SurveyQuestion_BasicSchema.parse(_details)

    const friendlyUnits = details.relevantUnitSlugs
    const enemyUnits = details.oppositeUnitSlugs

    return (
        <div>
            <h3 className='text-center'>{details.text}</h3>

            <div className='flex items-center w-full'>
                <div className='flex-1 flex justify-end gap-4 pr-4'>
                    {friendlyUnits && friendlyUnits.map((unit) => <UnitDisplay key={unit} unitSlug={unit} />)}
                </div>

                {enemyUnits && (
                    <>
                        <div className='flex-none'>
                            <p className='h3Style'>vs.</p>
                        </div>

                        <div className='flex-1 flex justify-start gap-4 pl-4'>
                            {enemyUnits.map((unit) => (
                                <UnitDisplay key={unit} unitSlug={unit} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
