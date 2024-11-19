import { AppLayout } from '@/layouts/AppLayout'
import { HomePage } from '@/pages/content/HomePage'
import { ErrorPage } from '@/pages/system/ErrorPage'
import { ActionFunctionArgs, createBrowserRouter, LoaderFunctionArgs, RouteObject, RouterProvider } from 'react-router-dom'
import { useResources } from './ResourceContextProvider'
import { Resources } from './resourceProvider'

// TODO: Move to types file

export interface RouteContext {
    resources: Resources
}

export type AppLoaderFunction<T> = (args: LoaderFunctionArgs, context: RouteContext) => Promise<T>

export type AppActionFunction = (args: ActionFunctionArgs, context: RouteContext) => Promise<Response>

export const routerConfig = {
    future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true
    }
}

export const createAppRoutes = (context: RouteContext) => {
    const { resources } = context

    const appRoutes: RouteObject[] = [
        {
            path: '/',
            element: <AppLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                    loader: async () => {
                        const [questions, units] = await Promise.all([resources.questionClient.getQuestions(), resources.unitClient.getUnits()])

                        return {
                            questions,
                            units
                        }
                    },
                    errorElement: <ErrorPage />
                }
            ],
            errorElement: <ErrorPage />
        }
    ]

    return appRoutes
}

export const createAppRouter = (context: RouteContext) => {
    const appRoutes = createAppRoutes(context)

    return createBrowserRouter(appRoutes, routerConfig)
}

export const AppRouter = () => {
    const resources = useResources()
    const router = createAppRouter({ resources })

    return <RouterProvider router={router} future={{ v7_startTransition: true }} />
}
