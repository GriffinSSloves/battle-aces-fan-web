import { UnitName } from '@/datacontracts/Unit'

export const getUnitImageSrc = (unitName: UnitName) => {
    const lowerCaseUnitName = unitName.toLowerCase()
    const withoutSpaces = lowerCaseUnitName.replace(/\s/g, '')
    return `images/units/${withoutSpaces}.png`
}
