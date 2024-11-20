import { getUnitImageSrc } from '@/assets/getUnitImageSrc'
import { Unit } from '@/datacontracts/Unit'

interface UnitDisplayProps {
    unit: Unit
}

export const UnitDisplay = ({ unit }: UnitDisplayProps) => {
    return (
        <div>
            <h3>{unit.name}</h3>
            <img src={getUnitImageSrc(unit.name)} alt={unit.name} className='h-full w-full max-h-64 max-w-64' />
        </div>
    )
}
