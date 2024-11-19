import { AnswerClient, IAnswerClient } from '@/clients/AnswerClient'
import { IDBFileSystem, IFileSystem } from '@/clients/FileSystem'
import { HttpClient, IHttpClient, UserHttpClient } from '@/clients/HttpClient'
import { IQuestionClient, QuestionClient } from '@/clients/QuestionClient'
import { ISessionDataClient, SessionDataFileClient } from '@/clients/SessionDataClient'
import { IUnitClient, UnitClient } from '@/clients/UnitClient'

export interface UserResources {
    userHttpClient: IHttpClient
    answerClient: IAnswerClient
}

export interface Resources {
    httpClient: IHttpClient
    fileSystem: IFileSystem
    unitClient: IUnitClient
    questionClient: IQuestionClient
    sessionClient: ISessionDataClient
    userResources: Promise<UserResources | null> // null means we failed to create the user resources
}

export interface IResourceProvider {
    resources: Resources
}

type GetUserId = () => Promise<string>

export class ResourceProvider {
    constructor(public readonly resources: Resources) {}

    static create(): IResourceProvider {
        const fileSystem = new IDBFileSystem()
        const sessionClient = new SessionDataFileClient(fileSystem)

        const httpClient = new HttpClient()
        const unitClient = new UnitClient(httpClient)
        const questionClient = new QuestionClient(httpClient)

        const userResources = ResourceProvider.#createUserResources(async () => {
            const session = await sessionClient.getOrCreate()

            return session.id
        }).catch((error) => {
            console.error('Failed to create user resources', error)
            return null
        })

        return new ResourceProvider({
            unitClient,
            questionClient,
            sessionClient,
            httpClient,
            fileSystem,
            userResources
        })
    }

    // Creates all of the resources asynchronously that are specific to the user
    static #createUserResources = async (getUserId: GetUserId): Promise<UserResources> => {
        const userId = await getUserId()

        const userHttpClient = new UserHttpClient(userId)
        const answerClient = new AnswerClient(userHttpClient)

        return {
            userHttpClient,
            answerClient
        }
    }
}
