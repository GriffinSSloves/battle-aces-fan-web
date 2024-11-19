import { Question } from '@/datacontracts/Question'
import { Unit } from '@/datacontracts/Unit'
import { AppLoaderFunction } from '@/lib/router'
import { useLoaderData } from 'react-router-dom'
import { z } from 'zod'

const HomePageLoaderData = z.object({
    questions: z.array(Question),
    units: z.array(Unit)
})
type HomePageLoaderData = z.infer<typeof HomePageLoaderData>

export const homeLoader: AppLoaderFunction<HomePageLoaderData> = async (_args, { resources }) => {
    const [questions, units] = await Promise.all([resources.questionClient.getQuestions(), resources.unitClient.getUnits()])

    return {
        questions,
        units
    }
}

export const HomePage = () => {
    const data = useLoaderData()
    const { questions, units } = HomePageLoaderData.parse(data)

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
        </div>
    )
}
