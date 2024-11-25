import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { SurveyQuestionTag } from '@battle-aces-fan/datacontracts'

export type TagMood = 'happy' | 'angry' | 'neutral'

interface AnswerTagProps {
    tag: SurveyQuestionTag
    currentValue: SurveyQuestionTag[]
    mood: TagMood
    onChange: (value: SurveyQuestionTag[]) => void
}

export const AnswerTag = ({ tag, currentValue, mood, onChange }: AnswerTagProps) => {
    const handleChange = () => {
        const newTags = currentValue.includes(tag) ? currentValue.filter((t) => t !== tag) : [...currentValue, tag]
        onChange(newTags)
    }

    const enabled = currentValue.includes(tag)

    const baseStyles = 'px-3 py-1 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer border'

    const typeStyles: Record<TagMood, { default: string; selected: string }> = {
        happy: {
            default: 'border-green-600 text-green-400 hover:bg-green-950',
            selected: 'border-green-400 bg-green-900 text-green-100 hover:bg-green-950'
        },
        angry: {
            default: 'border-red-600 text-red-400 hover:bg-red-950',
            selected: 'border-red-400 bg-red-900 text-red-100 hover:bg-red-950'
        },
        neutral: {
            default: 'border-yellow-600 text-yellow-400 hover:bg-yellow-800',
            selected: 'border-yellow-400 bg-yellow-700 text-yellow-100 hover:bg-yellow-800'
        }
    }

    return (
        <Button
            key={tag}
            type='button'
            onClick={handleChange}
            variant={enabled ? 'default' : 'outline'}
            className={cn(baseStyles, enabled ? typeStyles[mood].selected : typeStyles[mood].default)}>
            {tag}
        </Button>
    )
}
