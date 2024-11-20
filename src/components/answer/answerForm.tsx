import { HAPPY_TAG_KINDS, QuestionTagKind, SAD_TAG_KINDS } from '@/datacontracts/Question'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { AnswerButton } from './answerButton'
import { AnswerTag } from './answerTag'

type AnswerUnitSingleProps = {
    tags: QuestionTagKind[]
    onNext: () => void
}

const FormSchema = z.object({
    rating: z.number(),
    tags: z.array(QuestionTagKind)
})
type FormSchema = z.infer<typeof FormSchema>

const ratingOptions = [5, 4, 3, 2, 1]

export const AnswerForm = ({ tags, onNext }: AnswerUnitSingleProps) => {
    const form = useForm<FormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            rating: 0,
            tags: []
        }
    })

    const handleSubmit = (values: FormSchema) => {
        console.log('submit', values)

        // TODO: Reenable after fixing the button bug
        // form.reset()
        // onNext()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='mt-4'>
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
                                <div className='flex flex-col items-center gap-4 mt-4'>
                                    <div className='flex gap-2'>
                                        {HAPPY_TAG_KINDS.map((tag) => (
                                            <AnswerTag key={tag} tag={tag} currentValue={field.value} mood={'happy'} onChange={field.onChange} />
                                        ))}
                                    </div>

                                    {/* <div className='flex gap-2'>
                                        {OTHER_TAG_KINDS.map((tag) => (
                                            <AnswerTag key={tag} tag={tag} currentValue={field.value} mood={'neutral'} onChange={field.onChange} />
                                        ))}
                                    </div> */}

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

                <Button size='lg' type='submit' className='w-64 h-16 font-semibold battle-aces-orange mt-8'>
                    Submit
                </Button>
            </form>
        </Form>
    )
}
