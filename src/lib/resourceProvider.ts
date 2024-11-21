import { AnswerClient, IAnswerClient } from '@/clients/AnswerClient'
import { IDBFileSystem, IFileSystem } from '@/clients/FileSystem'
import { IQuestionClient, QuestionClient } from '@/clients/QuestionClient'
import { IUserClient, UserClient } from '@/clients/UserClient'
import { UserApiClient } from '@battle-aces-fan/user-clients'

export interface UserResources {
    questionClient: IQuestionClient
    answerClient: IAnswerClient
}

export interface Resources {
    fileSystem: IFileSystem
    userApiClient: UserApiClient
    userClient: IUserClient
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
        const userApiClient = UserApiClient({ url: 'http://localhost:8000' })
        const userClient = new UserClient({ fileSystem, userApiClient })

        const getUserId = async () => {
            const user = await userClient.getOrCreate()

            return user.id
        }

        const userResources = ResourceProvider.#createUserResources(getUserId, userApiClient).catch((error) => {
            console.error('Failed to create user resources', error)
            return null
        })

        return new ResourceProvider({
            fileSystem,
            userApiClient,
            userClient,
            userResources
        })
    }

    // Creates all of the resources asynchronously that are specific to the user
    static #createUserResources = async (getUserId: GetUserId, userApiClient: UserApiClient): Promise<UserResources> => {
        const userId = await getUserId()

        const questionClient = new QuestionClient(userApiClient, userId)
        const answerClient = new AnswerClient(userApiClient, userId)

        const userResources: UserResources = {
            answerClient,
            questionClient
        }

        return userResources
    }
}
