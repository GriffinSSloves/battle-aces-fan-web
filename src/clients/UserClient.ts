import { IFileSystem } from './FileSystem'
import { User } from '@battle-aces-fan/datacontracts'
import { UserApiClient } from '@battle-aces-fan/user-clients'
import { z } from 'zod'

export interface IUserClient {
    getOrCreate(): Promise<User>
}

interface UserClientParams {
    userApiClient: UserApiClient
    fileSystem: IFileSystem
}

const UserFileSchema = z.object({
    userId: z.string()
})
type UserFileSchema = z.infer<typeof UserFileSchema>

export class UserClient implements IUserClient {
    private fileName = 'user.json'

    constructor(private readonly params: UserClientParams) {}

    getOrCreate = async (): Promise<User> => {
        let userId: string | undefined = undefined

        const fileExists = await this.params.fileSystem.exists(this.fileName)
        if (fileExists) {
            try {
                const fileContents = await this.params.fileSystem.readFile(this.fileName)
                const parsedContents = JSON.parse(fileContents)

                const safeParseResult = UserFileSchema.safeParse(parsedContents)
                if (safeParseResult.success) {
                    userId = safeParseResult.data.userId
                }
            } catch (error) {
                console.error('failed to parse JSON from file:', error)
            }
        }

        console.log('userId:', userId)

        const response = await this.params.userApiClient.users['find-or-create'].$post({
            json: {
                userId
            }
        })

        const user = await response.json()

        const userFileContents: UserFileSchema = {
            userId: user.user._id
        }
        await this.params.fileSystem.writeFile(this.fileName, JSON.stringify(userFileContents, null, 2))
        console.log('wrote to file', userFileContents)

        return new User(user.user)
    }
}
