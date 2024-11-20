import { Question } from '@/datacontracts/Question'
import { useState } from 'react'
import { Button } from '../ui/button'
import { QuestionMap } from './questionMap'
import { AnswerForm } from '../answer/answerForm'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface QuestionListProps {
    questions: Question[]
}

export const QuestionList = ({ questions }: QuestionListProps) => {
    const [index, setIndex] = useState(0)
    const currentQuestion = questions[index]
    const CurrentQuestionComponent = QuestionMap[currentQuestion.kind]

    const handleNext = () => {
        if (index === questions.length - 1) {
            console.log('done')
            return
        }

        setIndex(index + 1)
    }

    return (
        <>
            <div className='flex items-center gap-4'>
                <div className='w-full h-full flex flex-col justify-center items-center text-center'>
                    <CurrentQuestionComponent _details={currentQuestion.details} />
                    <AnswerForm tags={['Buggy', 'Confusing']} onNext={handleNext} />
                </div>
            </div>
        </>
    )
}
