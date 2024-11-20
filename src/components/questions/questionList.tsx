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

    const handlePrevious = () => {
        if (index === 0) {
            console.log('done')
            return
        }

        setIndex(index - 1)
    }

    return (
        <>
            <div className='flex items-center gap-4'>
                <Button onClick={handlePrevious} disabled={index === 0} size='lg'>
                    <ArrowLeft />
                </Button>
                <div className='w-full h-full flex flex-col justify-center items-center text-center'>
                    <CurrentQuestionComponent _details={currentQuestion.details} />
                    <AnswerForm tags={['Buggy', 'Confusing']} onNext={handleNext} />
                </div>
                <Button onClick={handleNext} disabled={index === questions.length - 1} size='lg'>
                    <ArrowRight />
                </Button>
            </div>
        </>
    )
}
