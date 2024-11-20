import { Unit, UnitName } from '@/datacontracts/Unit'
import { z } from 'zod'

export const QUESTION_KINDS = ['unit_single', 'unit_matchup'] as const

export const QuestionKind = z.enum(QUESTION_KINDS)
export type QuestionKind = z.infer<typeof QuestionKind>

export const HAPPY_TAG_KINDS = ['Fun', 'Looks good', 'Feels good', 'Well designed'] as const
export const SAD_TAG_KINDS = ['Frustrating', 'Buggy', 'Confusing', 'Looks bad', 'Overpowered', 'Underpowered'] as const
export const OTHER_TAG_KINDS = ['Other', 'Have not used the unit'] as const

export const TAG_KINDS = [...HAPPY_TAG_KINDS, ...SAD_TAG_KINDS, ...OTHER_TAG_KINDS] as const

export const QuestionTagKind = z.enum(TAG_KINDS)
export type QuestionTagKind = z.infer<typeof QuestionTagKind>

export const UnitSingleQuestionDetails = z.object({
    kind: z.literal('unit_single'),
    unit: Unit
})
export type UnitSingleQuestionDetails = z.infer<typeof UnitSingleQuestionDetails>

export const UnitMatchupQuestionDetails = z.object({
    kind: z.literal('unit_matchup'),
    friendlyUnits: z.array(Unit),
    enemyUnits: z.array(Unit)
})
export type UnitMatchupQuestionDetails = z.infer<typeof UnitMatchupQuestionDetails>

export const QuestionDetails = z.discriminatedUnion('kind', [UnitSingleQuestionDetails, UnitMatchupQuestionDetails])
export type QuestionDetails = z.infer<typeof QuestionDetails>

export const Question = z.object({
    kind: QuestionKind,
    details: QuestionDetails
})
export type Question = z.infer<typeof Question>
