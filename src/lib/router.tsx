import { AppLayout } from '@/layouts/AppLayout'
import { homeLoader, HomePage } from '@/pages/content/HomePage'
import { ErrorPage } from '@/pages/system/ErrorPage'
import { ActionFunctionArgs, createBrowserRouter, LoaderFunctionArgs, RouteObject, RouterProvider } from 'react-router-dom'
import { useResources } from './ResourceContextProvider'
import { Resources } from './resourceProvider'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { AppFooter } from '@/layouts/AppFooter'
import { AppHeader } from '@/layouts/AppHeader'

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

// Avoids a warning for no fallback element. Mirrors AppLayout
const fallback = (
    <div className='min-h-screen flex flex-col'>
        <AppHeader />
        <main className='flex-grow'>
            <div className='container mx-auto max-w-6xl px-4 py-8'>
                <LoadingSpinner />
            </div>
        </main>
        <AppFooter />
    </div>
)

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
                    loader: (args) => homeLoader(args, context),
                    errorElement: <ErrorPage />
                }
            ],
            errorElement: <ErrorPage />,
            hydrateFallbackElement: fallback
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
