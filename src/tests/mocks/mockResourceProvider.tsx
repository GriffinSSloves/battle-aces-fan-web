import { IResourceProvider } from '@/lib/resourceProvider'
import { User } from '@battle-aces-fan/datacontracts'

// TODO: Implement these
export const mockResourceProvider: IResourceProvider = {
    resources: {
        userApiClient: '' as any,
        fileSystem: {
            readFile: function (path: string): Promise<string> {
                throw new Error('Function not implemented.')
            },
            writeFile: function (path: string, content: string): Promise<string> {
                throw new Error('Function not implemented.')
            },
            exists: function (path: string): Promise<boolean> {
                throw new Error('Function not implemented.')
            },
            deleteFile: function (path: string): Promise<void> {
                throw new Error('Function not implemented.')
            }
        },
        userClient: {
            getOrCreate: function (): Promise<User> {
                throw new Error('Function not implemented.')
            }
        },
        userResources: Promise.resolve(null)
    }
}
