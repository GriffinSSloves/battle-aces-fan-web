import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { Question } from '@/datacontracts/Question'
import { Unit } from '@/datacontracts/Unit'
import { AppLoaderFunction } from '@/lib/router'
import { delayMs } from '@/utils/delayMs'
import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { ErrorPage } from '../system/ErrorPage'
import { QuestionList } from '@/components/questions/questionList'

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

    return (
        <div className='h-full'>
            <h1 className='text-center mb-8'>Rate these units!</h1>
            <Suspense
                fallback={
                    <div className='mt-8'>
                        <LoadingSpinner />
                    </div>
                }>
                <Await resolve={data.questions} errorElement={<ErrorPage />}>
                    {(questions: Question[]) => <QuestionList questions={questions} />}
                </Await>
            </Suspense>
        </div>
    )
}
