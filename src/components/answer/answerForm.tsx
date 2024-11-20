import { HAPPY_TAG_KINDS, OTHER_TAG_KINDS, QuestionTagKind, SAD_TAG_KINDS } from '@/datacontracts/Question'
import { Angry, Frown, FrownIcon, Laugh, LaughIcon, Meh, MehIcon, Smile, SmileIcon } from 'lucide-react'
import { FC, ReactElement } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControllerRenderProps, useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { AnswerButton } from './answerButton'
import { AnswerTag, TagMood } from './answerTag'

type AnswerUnitSingleProps = {
    tags: QuestionTagKind[]
}

const FormSchema = z.object({
    rating: z.number(),
    tags: z.array(QuestionTagKind)
})
type FormSchema = z.infer<typeof FormSchema>

const ratingOptions = [1, 2, 3, 4, 5]

export const AnswerForm = ({ tags }: AnswerUnitSingleProps) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            rating: 0,
            tags: []
        }
    })

    const handleSubmit = (values: FormSchema) => {
        console.log('submit', values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
                <FormField
                    control={form.control}
                    name='rating'
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormControl>
                                    <div className='flex gap-4 justify-center'>
                                        {ratingOptions.map((rating) => (
                                            <AnswerButton key={rating} rating={rating} onChange={field.onChange} currentValue={field.value} />
                                        ))}
                                    </div>
                                </FormControl>
                            </FormItem>
                        )
                    }}
                />

                <FormField
                    control={form.control}
                    name='tags'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='flex flex-col items-center gap-4'>
                                    <div className='flex gap-2'>
                                        {HAPPY_TAG_KINDS.map((tag) => (
                                            <AnswerTag key={tag} tag={tag} currentValue={field.value} mood={'happy'} onChange={field.onChange} />
                                        ))}
                                    </div>

                                    <div className='flex gap-2'>
                                        {OTHER_TAG_KINDS.map((tag) => (
                                            <AnswerTag key={tag} tag={tag} currentValue={field.value} mood={'neutral'} onChange={field.onChange} />
                                        ))}
                                    </div>

                                    <div className='flex gap-2'>
                                        {SAD_TAG_KINDS.map((tag) => (
                                            <AnswerTag key={tag} tag={tag} currentValue={field.value} mood={'angry'} onChange={field.onChange} />
                                        ))}
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    )
}