import { ResourceContextProvider } from '@/lib/ResourceContextProvider'
import { IResourceProvider } from '@/lib/resourceProvider'
import { createAppRoutes, routerConfig } from '@/lib/router'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactElement } from 'react'
import { createMemoryRouter, RouteObject, RouterProvider } from 'react-router-dom'
import { mockResourceProvider } from './mocks/mockResourceProvider'

type TestRenderOptions = {
    resourceProvider?: IResourceProvider
    renderOptions?: RenderOptions
}

export const testRender = (ui: ReactElement, options: TestRenderOptions = {}) => {
    const { renderOptions = {}, resourceProvider = mockResourceProvider } = options
    const appRoutes: RouteObject[] = createAppRoutes({ resources: resourceProvider.resources })

    const testRoutes: RouteObject[] = [
        ...appRoutes,
        {
            path: '/test',
            element: ui
        }
    ]

    return testRenderWithAppRoutes({ initialRoute: '/test', routes: testRoutes, renderOptions })
}

type TestRenderWithAppRoutesOptions = {
    initialRoute?: string
    routes?: RouteObject[]
    renderOptions?: RenderOptions
    resourceProvider?: IResourceProvider
}

export const testRenderWithAppRoutes = (options: TestRenderWithAppRoutesOptions = {}) => {
    const { initialRoute = '/', renderOptions = {}, resourceProvider = mockResourceProvider } = options
    const routes: RouteObject[] = options.routes ?? createAppRoutes({ resources: resourceProvider.resources })

    const router = createMemoryRouter(routes, {
        initialEntries: [initialRoute],
        ...routerConfig
    })

    // Wrap this in any other Providers we need
    const uiWithProviders = (
        <ResourceContextProvider resourceProvider={resourceProvider}>
            <RouterProvider router={router} />
        </ResourceContextProvider>
    )
    return {
        user: userEvent.setup(),
        router,
        ...render(uiWithProviders, renderOptions)
    }
}
