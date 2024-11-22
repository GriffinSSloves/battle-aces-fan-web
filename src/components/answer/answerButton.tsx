import { Angry, Frown, Meh, Smile, Laugh } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SmileyFaceRating } from '@battle-aces-fan/datacontracts'

// Map moods to colors
export const getMoodStyles = (rating: SmileyFaceRating) => {
    switch (rating) {
        case 'veryUnhappy': // Angry - red
            return 'bg-red-500 hover:bg-red-600 text-white'
        case 'unhappy': // Frown - orange
            return 'bg-orange-500 hover:bg-orange-600 text-white'
        case 'neutral': // Meh - yellow
            return 'bg-yellow-500 hover:bg-yellow-600 text-white'
        case 'happy': // Smile - green
            return 'bg-lime-500 hover:bg-lime-600 text-white'
        case 'veryHappy': // Laugh - emerald
            return 'bg-emerald-500 hover:bg-emerald-600 text-white'
        default:
            return ''
    }
}

interface AnswerButtonProps {
    rating: SmileyFaceRating
    currentValue: SmileyFaceRating | null
    onChange: (value: SmileyFaceRating) => void
}

export const AnswerButton = ({ rating, currentValue, onChange }: AnswerButtonProps) => {
    const enabled = rating === currentValue

    const getIcon = () => {
        const iconProps = {
            size: 48,
            className: cn('transition-transform duration-200', enabled && 'scale-110')
        }

        switch (rating) {
            case 'veryUnhappy':
                return <Angry {...iconProps} />
            case 'unhappy':
                return <Frown {...iconProps} />
            case 'neutral':
                return <Meh {...iconProps} />
            case 'happy':
                return <Smile {...iconProps} />
            case 'veryHappy':
                return <Laugh {...iconProps} />
            default:
                return null
        }
    }

    const getMoodStylesForButton = (rating: SmileyFaceRating, enabled: boolean) => {
        if (!enabled) {
            return ''
        }

        return getMoodStyles(rating)
    }

    // TODO: Why does clicking one of these submit the form?

    return (
        <Button
            type='button'
            onClick={() => onChange(rating)}
            variant={enabled ? 'default' : 'outline'}
            className={cn(
                'h-14 w-14 md:h-20 md:w-20 p-2 transition-all duration-200',
                'hover:bg-gray-600',
                'bg-gray-500',
                getMoodStylesForButton(rating, enabled)
            )}>
            {getIcon()}
        </Button>
    )
}
