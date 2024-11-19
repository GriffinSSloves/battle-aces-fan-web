import { SessionData } from '@/datacontracts/Session'
import { IFileSystem } from './FileSystem'

export interface ISessionDataClient {
    getOrCreate(): Promise<SessionData>
}

// TODO: Implement
export class SessionDataFileClient implements ISessionDataClient {
    filepath: string = 'session.json'

    constructor(private readonly fileSystem: IFileSystem) {}

    async getOrCreate(): Promise<SessionData> {
        return {
            id: '123',
            battleAcesId: '456',
            questionsAnswered: []
        }
    }
}
