import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { Question } from '@/datacontracts/Question'
import { Unit } from '@/datacontracts/Unit'
import { AppLoaderFunction } from '@/lib/router'
import { Suspense, useState } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { ErrorPage } from '../system/ErrorPage'
import { QuestionList } from '@/components/questions/questionList'
import { FinishedAnswering } from '@/components/home/finishedAnswering'
import { HelpPopover } from '@/components/home/helpPopover'

export type HomePageLoaderData = {
    questions: Promise<Question[]>
    units: Promise<Unit[]>
}

export const homeLoader: AppLoaderFunction<HomePageLoaderData> = async (_args, { resources }) => {
    const getQuestions = async () => {
        console.log('starting loading questions')
        console.log('finished loading questions')
        return resources.questionClient.getQuestions()
    }

    try {
        const questions = getQuestions()
        const units = resources.unitClient.getUnits()

        return {
            questions,
            units
        }
    } catch (error) {
        console.error('Error loading home page', error)
        throw error
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
                    {(questions: Question[]) =>
                        isFinished ? <FinishedAnswering /> : <QuestionList questions={questions} setIsFinished={() => setIsFinished(true)} />
                    }
                </Await>
            </Suspense>
        </div>
    )
}
