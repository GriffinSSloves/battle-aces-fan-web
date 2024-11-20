import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export type TagMood = 'happy' | 'angry' | 'neutral'

interface AnswerTagProps {
    tag: string
    currentValue: string[]
    mood: TagMood
    onChange: (value: string[]) => void
}

export const AnswerTag = ({ tag, currentValue, mood, onChange }: AnswerTagProps) => {
    const handleChange = () => {
        const newTags = currentValue.includes(tag) ? currentValue.filter((t) => t !== tag) : [...currentValue, tag]
        onChange(newTags)
    }

    const rating = mood === 'happy' ? 5 : mood === 'neutral' ? 3 : 1

    const enabled = currentValue.includes(tag)

    const baseStyles = 'px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer border'

    const typeStyles: Record<TagMood, { default: string; selected: string }> = {
        happy: {
            default: 'border-green-600 text-green-400 hover:bg-green-950',
            selected: 'border-green-400 bg-green-900 text-green-100'
        },
        angry: {
            default: 'border-red-600 text-red-400 hover:bg-red-950',
            selected: 'border-red-400 bg-red-900 text-red-100'
        },
        neutral: {
            default: 'border-gray-600 text-gray-400 hover:bg-gray-800',
            selected: 'border-gray-400 bg-gray-700 text-gray-100'
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
