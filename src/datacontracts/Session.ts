import { z } from 'zod'
import { Question } from './Question'

export const SessionData = z.object({
    id: z.string(),
    battleAcesId: z.string().optional(),
    questionsAnswered: z.array(Question)
})
export type SessionData = z.infer<typeof SessionData>
