import { HttpRequestOptions } from '@/clients/HttpClient'
import { SessionData } from '@/datacontracts/Session'
import { IResourceProvider } from '@/lib/resourceProvider'

// TODO: Implement these
export const mockResourceProvider: IResourceProvider = {
    resources: {
        questionClient: {
            getQuestions: async () => []
        },
        unitClient: {
            getUnits: async () => []
        },
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
        httpClient: {
            get: function (url: string, options?: HttpRequestOptions): Promise<string> {
                throw new Error('Function not implemented.')
            },
            post: function (url: string, body: unknown, options?: HttpRequestOptions): Promise<string> {
                throw new Error('Function not implemented.')
            }
        },
        sessionClient: {
            getOrCreate: function (): Promise<SessionData> {
                throw new Error('Function not implemented.')
            }
        },
        userResources: Promise.resolve(null)
    }
}
