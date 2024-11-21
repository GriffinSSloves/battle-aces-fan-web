import { getUnitImageSrc } from '@/assets/getUnitImageSrc'

interface UnitDisplayProps {
    unitSlug: string
}

export const UnitDisplay = ({ unitSlug }: UnitDisplayProps) => {
    return (
        <div className='flex flex-col items-center'>
            <h2 className='mb-4'>{unitSlug}</h2>
            <img src={getUnitImageSrc(unitSlug)} alt={unitSlug} className='h-full w-full max-h-32 max-w-32 md:max-h-64 md:max-w-64  ' />
        </div>
    )
}
