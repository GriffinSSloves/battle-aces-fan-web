export const getUnitImageSrc = (unitName: string) => {
    const lowerCaseUnitName = unitName.toLowerCase()
    const withoutSpaces = lowerCaseUnitName.replace(/\s/g, '')
    return `images/units/${withoutSpaces}.png`
}
