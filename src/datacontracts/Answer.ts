import { z } from 'zod'
import { Question, QuestionTagKind } from './Question'

export const Answer = z.object({
    question: Question,
    rating: z.number(),
    tags: z.array(QuestionTagKind)
})
export type Answer = z.infer<typeof Answer>
