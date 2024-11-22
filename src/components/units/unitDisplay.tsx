import { getUnitImageSrc } from '@/assets/getUnitImageSrc'

interface UnitDisplayProps {
    unitSlug: string
}

export const UnitDisplay = ({ unitSlug }: UnitDisplayProps) => {
    return (
        <div className='flex flex-col items-center'>
            <img src={getUnitImageSrc(unitSlug)} alt={unitSlug} className='h-32 w-32 md:h-64 md:w-64' />
        </div>
    )
}
