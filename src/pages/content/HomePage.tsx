import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { AppLoaderFunction } from '@/lib/router'
import { Suspense, useState } from 'react'
import { Await, useLoaderData } from 'react-router-dom'
import { ErrorPage } from '../system/ErrorPage'
import { QuestionList } from '@/components/questions/questionList'
import { FinishedAnswering } from '@/components/home/finishedAnswering'
import { SurveyQuestion, TagMoodMap, UnitSchema } from '@battle-aces-fan/datacontracts'
import { TagMoodMapProvider } from '@/lib/TagMoodMapContextProvider'
import { UnitsProvider } from '@/lib/UnitContextProvider'
import { HelpHoverCard } from '@/components/home/helpHoverCard'

export type HomePageLoaderData = {
    questions: Promise<SurveyQuestion[]>
    moodMap: Promise<TagMoodMap>
    units: Promise<UnitSchema[]>
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

    const getMoodMap = async () => {
        const response = await resources.userApiClient.tags['mood-map'].$get()
        const json = await response.json()
        return json.map
    }

    const getUnits = async () => {
        const response = await resources.userApiClient.units.$get()
        const json = await response.json()
        return json.units
    }

    return {
        questions: getQuestions(),
        moodMap: getMoodMap(),
        units: getUnits()
    }
}

export const HomePage = () => {
    const data = useLoaderData() as HomePageLoaderData

    const [isFinished, setIsFinished] = useState(false)

    return (
        <div className='h-full flex flex-col'>
            <div className='flex mb-4 '>
                <div className='w-12' />
                <h1 className='flex-grow text-center md:mb-8'>Rate these units and matchups!</h1>
                <HelpHoverCard />
            </div>

            <Suspense
                fallback={
                    <div className='mt-8'>
                        <LoadingSpinner />
                    </div>
                }>
                <Await resolve={Promise.all([data.questions, data.moodMap, data.units])} errorElement={<ErrorPage />}>
                    {([questions, moodMap, units]: [SurveyQuestion[], TagMoodMap, UnitSchema[]]) =>
                        isFinished ? (
                            <FinishedAnswering />
                        ) : (
                            <UnitsProvider units={units}>
                                <TagMoodMapProvider moodMap={moodMap}>
                                    <QuestionList questions={questions} setIsFinished={() => setIsFinished(true)} />
                                </TagMoodMapProvider>
                            </UnitsProvider>
                        )
                    }
                </Await>
            </Suspense>
        </div>
    )
}
