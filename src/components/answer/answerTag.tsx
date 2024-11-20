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

    const colorClass = mood === 'happy' ? 'bg-green-500' : mood === 'angry' ? 'bg-red-600' : 'bg-yellow-600'

    const enabled = currentValue.includes(tag)

    return (
        <Button key={tag} type='button' onClick={handleChange} className={`h8 bg-green  ${colorClass}`}>
            {tag}
        </Button>
    )
}
