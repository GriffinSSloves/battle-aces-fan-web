import { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { Resources, UserResources, IResourceProvider } from './resourceProvider'

// Context Provider for general resources and resources tied to the user

const ResourceContext = createContext<Resources | undefined>(undefined)
const UserResourceContext = createContext<UserResources | null | undefined>(undefined)

interface ResourceContextProviderProps {
    resourceProvider: IResourceProvider
    children: ReactNode
}

export const ResourceContextProvider = ({ resourceProvider, children }: ResourceContextProviderProps) => {
    const [userResources, setUserResources] = useState<UserResources | null>(null)

    useEffect(() => {
        resourceProvider.resources.userResources.then(setUserResources)
    }, [resourceProvider.resources.userResources])

    return (
        <ResourceContext.Provider value={resourceProvider.resources}>
            <UserResourceContext.Provider value={userResources}>{children}</UserResourceContext.Provider>
        </ResourceContext.Provider>
    )
}

export const useResources = (): Resources => {
    const context = useContext(ResourceContext)
    if (context === undefined) {
        throw new Error('useResources must be used within a ResourceContextProvider')
    }
    return context
}

export const useUserResources = (): {
    userResources: UserResources | null | undefined
    isLoading: boolean
    hasError: boolean
} => {
    const userResources = useContext(UserResourceContext)

    return {
        userResources,
        isLoading: userResources === undefined,
        hasError: userResources === null
    }
}

// Convenience hook for components that require user resources
export const useRequiredUserResources = (): UserResources => {
    const { userResources, isLoading, hasError } = useUserResources()

    if (isLoading) {
        throw new Error('User resources are still loading')
    }

    if (hasError || !userResources) {
        throw new Error('Failed to load user resources')
    }

    return userResources
}
