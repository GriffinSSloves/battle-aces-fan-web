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

export const UnitStats = z.object({
    health: z.number(),
    damage: z.number(),
    speed: z.number(),
    range: z.number()
})
export type UnitStats = z.infer<typeof UnitStats>

export const Unit = z.object({
    name: UnitName, // Will be used to look up the unit, to keep things simple
    category: UnitCategory,
    stats: UnitStats
})
export type Unit = z.infer<typeof Unit>
