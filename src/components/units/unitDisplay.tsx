import { getUnitImageSrc } from '@/assets/getUnitImageSrc'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { UnitStatHoverCard } from './unitStatHoverCard'

interface UnitDisplayProps {
    unitSlug: string
}

export const UnitDisplay = ({ unitSlug }: UnitDisplayProps) => {
    return (
        <div className='flex flex-col items-center'>
            <HoverCard>
                <HoverCardTrigger asChild>
                    <img src={getUnitImageSrc(unitSlug)} alt={unitSlug} className='h-32 w-32 md:h-64 md:w-64' />
                </HoverCardTrigger>
                <HoverCardContent className='w-[320px] md:w-[512px]'>
                    <UnitStatHoverCard unitSlug={unitSlug} />
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}
