import { useUnitsContext } from '@/lib/UnitContextProvider'

interface UnitCostProps {
    imgSrc: string
    value: number
    color: string
}

export const UnitCost = ({ imgSrc, value, color }: UnitCostProps) => {
    return (
        <div className='flex mr-4 border p-2 rounded-md bg-slate-700'>
            <img src={imgSrc} className={`w-6 h-6 mr-1 ${color}`} />
            <div className={`${color}`}>{value}</div>
        </div>
    )
}

// TODO: Rename
interface UnitFeatureProps {
    label: string
    value: string
}

export const UnitFeature = ({ label, value }: UnitFeatureProps) => {
    return (
        <div className='w-1/4'>
            <p className='text-start'>
                <span className='text-sm text-slate-300'>{label}</span>
                <br />
                <span>{value}</span>
            </p>
        </div>
    )
}

// TODO: Add Unit Trait pics
interface UnitTraitProps {
    trait: string
}

export const UnitTrait = ({ trait }: UnitTraitProps) => {
    return (
        <div className='flex mr-4 border p-2 rounded-md bg-slate-700 w-fit'>
            <p className='text-sm text-start text-nowrap'>{trait}</p>
        </div>
    )
}

interface UnitStatHoverCardProps {
    unitSlug: string
}

export const UnitStatHoverCard = ({ unitSlug }: UnitStatHoverCardProps) => {
    const units = useUnitsContext()

    const unit = units.find((u) => u.details.slug === unitSlug)

    if (!unit) {
        return <div>Error loading stats</div>
    }

    return (
        <div className='w-full'>
            <h3 className='leading-none text-center'>{unit.details.name}</h3>
            <div className='flex gap-2 mt-4'>
                <UnitCost imgSrc='images/stats/matter.svg' value={unit.details.costMatter} color='text-red-500' />
                <UnitCost imgSrc='images/stats/energy.svg' value={unit.details.costEnergy} color='text-blue-500' />
                <UnitCost imgSrc='images/stats/bandwidth.svg' value={unit.details.costBandwidth} color='text-yellow-500' />
            </div>

            <div className='flex flex-wrap gap-4 mt-8 w-full justify-between'>
                <UnitFeature label='Unit Type' value={unit.details.unitDomain.name} />
                <UnitFeature
                    label='Attacks'
                    value={unit.details.targetsGround && unit.details.targetsAir ? 'Ground + Air' : unit.details.targetsGround ? 'Ground' : 'Air'}
                />
                <UnitFeature label='Tech Tree' value={unit.details.techTier.name} />
                {unit.details.unitAbility && <UnitFeature label='Ability' value={unit.details.unitAbility.name} />}
                <div className='w-1/4'>
                    <p className='text-start text-sm text-slate-300'>Traits</p>
                    <div className='flex'>
                        {unit.details.unitTraits.map((trait) => (
                            <UnitTrait key={trait.name} trait={trait.name} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
