import { zodResolver } from '@hookform/resolvers/zod'
import { FieldErrors, useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { AnswerButton } from './answerButton'
import { AnswerTag } from './answerTag'
import { cn } from '@/lib/utils'
import { SmileyFaceRating, SurveyQuestion, SurveyQuestionResponseDetails, SurveyQuestionTag } from '@battle-aces-fan/datacontracts'
import { useUserResources } from '@/lib/ResourceContextProvider'

type AnswerUnitSingleProps = {
    question: SurveyQuestion
    tags: SurveyQuestionTag[]
    onNext: () => void
}

// use version from data contracts
export const UserSubmitResponseSchema = z.object({
    details: SurveyQuestionResponseDetails.omit({
        userId: true
    })
})
export type UserSubmitResponseSchema = z.infer<typeof UserSubmitResponseSchema>

const ratingOptions: SmileyFaceRating[] = ['veryUnhappy', 'unhappy', 'neutral', 'happy', 'veryHappy']

export const AnswerForm = ({ question, tags, onNext }: AnswerUnitSingleProps) => {
    const form = useForm<UserSubmitResponseSchema>({
        resolver: zodResolver(UserSubmitResponseSchema),
        defaultValues: {
            details: {
                questionId: question.id,
                questionKind: question.kind,
                tags: [],
                skipped: false
            }
        }
    })

    const userResources = useUserResources()

    const handleSubmit = async (values: UserSubmitResponseSchema) => {
        if (!userResources.userResources) {
            console.error('user resources not loaded')
            return
        }

        try {
            await userResources.userResources.answerClient.postAnswer({
                details: values.details
            })
        } catch (error) {
            console.error('error posting answer', error)
        }

        onNext()
        form.reset()
    }

    const onValidationFailed = (errors: FieldErrors<UserSubmitResponseSchema>) => {
        console.log('validation failed', errors)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit, onValidationFailed)} className='flex flex-col h-full'>
                {/* Main content section - flex-grow to push button down */}
                <div className='flex-grow space-y-8'>
                    <FormField
                        control={form.control}
                        name='details.smileyFaceRating'
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
                        name='details.tags'
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className='flex items-center justify-center gap-2 gap-y-4 flex-wrap max-w-[650px] mx-auto'>
                                        {tags.map((tag) => (
                                            <AnswerTag key={tag} tag={tag} currentValue={field.value} mood={'happy'} onChange={field.onChange} />
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Fixed button container */}
                <div className='static bottom-4 left-0 right-0 p-4'>
                    <Button
                        size='lg'
                        type='submit'
                        disabled={!form.formState.isValid || userResources.isLoading}
                        className={cn(
                            'w-full h-12 md:w-64 md:h-16 text-xl md:text-2xl font-semibold text-gray-200',
                            'battle-aces-orange',
                            'disabled:opacity-75'
                        )}>
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    )
}
