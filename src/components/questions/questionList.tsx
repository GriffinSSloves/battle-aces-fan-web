import { Question } from '@/datacontracts/Question'
import { useState } from 'react'
import { QuestionMap } from './questionMap'
import { AnswerForm } from '../answer/answerForm'

interface QuestionListProps {
    questions: Question[]
    setIsFinished: () => void
}

export const QuestionList = ({ questions, setIsFinished }: QuestionListProps) => {
    const [index, setIndex] = useState(0)
    const currentQuestion = questions[index]
    const CurrentQuestionComponent = QuestionMap[currentQuestion.kind]

    const handleNext = () => {
        if (index === questions.length - 1) {
            setIsFinished()
            console.log('finished')
            return
        }

        setIndex(index + 1)
    }

    return (
        <div className='flex-grow flex items-center gap-4'>
            <div className='w-full h-full flex flex-col gap-4 justify-center items-center text-center'>
                <CurrentQuestionComponent _details={currentQuestion.details} />
                <AnswerForm question={currentQuestion} tags={['Buggy', 'Confusing']} onNext={handleNext} />
            </div>
        </div>
    )
}
