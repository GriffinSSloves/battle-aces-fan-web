import { UnitName } from '@/datacontracts/Unit'
import { z } from 'zod'

export const QUESTION_KINDS = ['unit_single', 'unit_matchup'] as const

export const QuestionKind = z.enum(QUESTION_KINDS)
export type QuestionKind = z.infer<typeof QuestionKind>

export const HAPPY_TAG_KINDS = ['Fun', 'Looks good', 'Feels good', 'Well designed'] as const
export const SAD_TAG_KINDS = ['Frustrating', 'Buggy', 'Confusing', 'Looks bad', 'Overpowered', 'Underpowered'] as const
export const OTHER_TAG_KINDS = ['Other'] as const

export const TAG_KINDS = [...HAPPY_TAG_KINDS, ...SAD_TAG_KINDS, ...OTHER_TAG_KINDS] as const

export const QuestionTagKind = z.enum(TAG_KINDS)
export type QuestionTagKind = z.infer<typeof QuestionTagKind>

export const UnitSingleQuestionDetails = z.object({
    kind: z.literal('unit_single'),
    unitName: UnitName
})
export type UnitSingleQuestionDetails = z.infer<typeof UnitSingleQuestionDetails>

export const UnitMatchupQuestionDetails = z.object({
    kind: z.literal('unit_matchup'),
    friendlyUnitNames: z.array(UnitName),
    enemyUnitNames: z.array(UnitName)
})
export type UnitMatchupQuestionDetails = z.infer<typeof UnitMatchupQuestionDetails>

export const QuestionDetails = z.discriminatedUnion('kind', [UnitSingleQuestionDetails, UnitMatchupQuestionDetails])
export type QuestionDetails = z.infer<typeof QuestionDetails>

export const QuestionAnswer = z.object({
    rating: z.number(),
    tags: z.array(QuestionTagKind)
})
export type QuestionAnswer = z.infer<typeof QuestionAnswer>

export const Question = z.object({
    kind: QuestionKind,
    details: QuestionDetails,
    answer: QuestionAnswer.nullable()
})
