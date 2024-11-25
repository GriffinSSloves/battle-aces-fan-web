import { createContext, useContext, ReactNode } from 'react'
import { UnitSchema } from '@battle-aces-fan/datacontracts'

const UnitsContext = createContext<UnitSchema[] | null>(null)

export const UnitsProvider = ({ children, units }: { children: ReactNode; units: UnitSchema[] }) => {
    return <UnitsContext.Provider value={units}>{children}</UnitsContext.Provider>
}

export const useUnitsContext = () => {
    const context = useContext(UnitsContext)
    if (!context) {
        throw new Error('useUnitsContext must be used within a UnitsProvider')
    }
    return context
}
