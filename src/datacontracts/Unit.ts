import { z } from 'zod'

export const UNIT_CATEGORIES = ['Core', 'Foundry', 'Starforge', 'Advanced Foundry', 'Advanced Starforge'] as const

export const UnitCategory = z.enum(UNIT_CATEGORIES)
export type UnitCategory = z.infer<typeof UnitCategory>

export const UNIT_NAMES = [
    'Crab',
    'Hunter',
    'Recall',
    'Recall Hunter',
    'Scorpion',
    'Beetle',
    'Blink',
    'Blink Hunter',
    'Gunbot',
    'Missilebot',
    'Wasp',
    'Hornet',
    'Knight',
    'Crossbow',
    'Ballista',
    'King Crab',
    'Crusader',
    'Bomber',
    'Shocker',
    'Recall Shocker',
    'Mortar',
    'Swift Shocker',
    'Heavy Hunter',
    'Destroyer',
    'Raider',
    'Turret',
    'Butterfly',
    'Dragonfly',
    'Falcon',
    'Airship',
    'Advanced Recall',
    'Mammoth',
    'Stinger',
    'Flak Turret',
    'Heavy Ballista',
    'Gargantua',
    'Sniper',
    'Advanced Blink',
    'Assaultbot',
    'Advancedbot',
    'Behemoth',
    'Bulwark',
    'Katbus',
    'Locust',
    'Kraken',
    'Predator',
    'Valkyrie',
    'Advanced Destroyer',
    'Artillery'
] as const

export const UnitName = z.enum(UNIT_NAMES)
export type UnitName = z.infer<typeof UnitName>

// TODO: Are there more stats?
export const UnitStats = z.object({
    matter: z.number(),
    energy: z.number(),
    bandwidth: z.number()
})
export type UnitStats = z.infer<typeof UnitStats>

export const UNIT_ATTACKS = ['Ground', 'Ground + Air', 'Air'] as const
export const UnitAttacks = z.enum(UNIT_ATTACKS)
export type UnitAttacks = z.infer<typeof UnitAttacks>

export const UNIT_TYPE = ['Ground', 'Air'] as const
export const UnitType = z.enum(UNIT_TYPE)
export type UnitType = z.infer<typeof UnitType>

// TODO: Fill out the traits
export const UNIT_TRAITS = ['Big', 'Small', 'Splash', 'Anti-Air', 'Anti-Big'] as const

export const UnitTraits = z.enum(UNIT_TRAITS)
export type UnitTraits = z.infer<typeof UnitTraits>

export const UNIT_ABILITY = [
    'Blink',
    'Recall',
    'Gets countered by ground',
    'Overclock',
    'Setup',
    'Can only attack workers',
    'Destruct',
    'Can be placed around the Core and Resource Bases'
] as const
export const UnitAbility = z.enum(UNIT_ABILITY)
export type UnitAbility = z.infer<typeof UnitAbility>

export const Unit = z.object({
    name: UnitName, // Will be used to look up the unit, to keep things simple
    category: UnitCategory,
    stats: UnitStats,
    type: UnitType,
    attacks: UnitAttacks,
    traits: z.array(UnitTraits),
    ability: z.array(UnitAbility)
})
export type Unit = z.infer<typeof Unit>
