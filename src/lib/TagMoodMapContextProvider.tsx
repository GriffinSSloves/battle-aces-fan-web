import { createContext, useContext, ReactNode } from 'react'
import { TagMoodMap } from '@battle-aces-fan/datacontracts'

const TagMoodMapContext = createContext<TagMoodMap | null>(null)

export const TagMoodMapProvider = ({ children, moodMap }: { children: ReactNode; moodMap: TagMoodMap }) => {
    return <TagMoodMapContext.Provider value={moodMap}>{children}</TagMoodMapContext.Provider>
}

export const useTagMoodMapContext = () => {
    const context = useContext(TagMoodMapContext)
    if (!context) {
        throw new Error('useTagMoodMapContext must be used within a TagMoodMapProvider')
    }
    return context
}
