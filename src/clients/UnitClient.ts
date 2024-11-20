import { Unit } from '@/datacontracts/Unit'
import { IHttpClient } from './HttpClient'

export interface IUnitClient {
    getUnits: () => Promise<Unit[]>
}

export const getMockUnit = (): Unit => {
    return {
        ability: ['Blink'],
        attacks: 'Ground',
        category: 'Advanced Foundry',
        name: 'Behemoth',
        stats: {
            bandwidth: 12,
            energy: 5,
            matter: 100
        },
        traits: ['Anti-Air'],
        type: 'Ground'
    }
}

export class UnitClient {
    route = '/units'

    constructor(private readonly httpClient: IHttpClient) {}

    getUnits = async (): Promise<Unit[]> => {
        return [getMockUnit()]
    }
}
