import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { AppLoaderFunction } from '@/lib/router'
import { Suspense, useState } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { ErrorPage } from '../system/ErrorPage'
import { QuestionList } from '@/components/questions/questionList'
import { FinishedAnswering } from '@/components/home/finishedAnswering'
import { HelpPopover } from '@/components/home/helpPopover'
import { SurveyQuestion } from '@battle-aces-fan/datacontracts'

export type HomePageLoaderData = {
    questions: Promise<SurveyQuestion[]>
}

export const homeLoader: AppLoaderFunction<HomePageLoaderData> = async (_args, { resources }) => {
    const getQuestions = async () => {
        const userResources = await resources.userResources
        if (!userResources) {
            throw new Error('Failed to load user resources')
        }

        const questions = await userResources.questionClient.getQuestions()

        // TODO: Move this later, this shouldn't be here
        const shuffledQuestions = questions.sort(() => Math.random() - 0.5)
        return shuffledQuestions
    }

    return {
        questions: getQuestions()
    }
}

export const HomePage = () => {
    const data = useLoaderData() as HomePageLoaderData

    const [isFinished, setIsFinished] = useState(false)

    return (
        <div className='h-full flex flex-col'>
            <div className='flex mb-4 '>
                <h1 className='flex-grow text-center md:mb-8'>Rate these units and matchups!</h1>
                <HelpPopover />
            </div>

            <Suspense
                fallback={
                    <div className='mt-8'>
                        <LoadingSpinner />
                    </div>
                }>
                <Await resolve={data.questions} errorElement={<ErrorPage />}>
                    {(questions: SurveyQuestion[]) =>
                        isFinished ? <FinishedAnswering /> : <QuestionList questions={questions} setIsFinished={() => setIsFinished(true)} />
                    }
                </Await>
            </Suspense>
        </div>
    )
}
