import { Angry, Frown, Meh, Smile, Laugh } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Map moods to colors
export const getMoodStylesDisabled = (rating: number) => {
    switch (rating) {
        case 1: // Angry - red
            return 'bg-red-500 hover:bg-red-600 text-white'
        case 2: // Frown - orange
            return 'bg-orange-500 hover:bg-orange-600 text-white'
        case 3: // Meh - yellow
            return 'bg-yellow-500 hover:bg-yellow-600 text-white'
        case 4: // Smile - green
            return 'bg-lime-500 hover:bg-lime-600 text-white'
        case 5: // Laugh - emerald
            return 'bg-emerald-800 hover:bg-emerald-900 text-white'
        default:
            return ''
    }
}

// Map moods to colors
export const getMoodStyles = (rating: number) => {
    switch (rating) {
        case 1: // Angry - red
            return 'bg-red-500 hover:bg-red-600 text-white'
        case 2: // Frown - orange
            return 'bg-orange-500 hover:bg-orange-600 text-white'
        case 3: // Meh - yellow
            return 'bg-yellow-500 hover:bg-yellow-600 text-white'
        case 4: // Smile - green
            return 'bg-lime-500 hover:bg-lime-600 text-white'
        case 5: // Laugh - emerald
            return 'bg-emerald-500 hover:bg-emerald-600 text-white'
        default:
            return ''
    }
}

interface AnswerButtonProps {
    rating: number
    currentValue: number
    onChange: (value: number) => void
}

export const AnswerButton = ({ rating, currentValue, onChange }: AnswerButtonProps) => {
    const enabled = rating === currentValue

    const getIcon = () => {
        const iconProps = {
            size: 48,
            className: cn('transition-transform duration-200', enabled && 'scale-110')
        }

        switch (rating) {
            case 1:
                return <Angry {...iconProps} />
            case 2:
                return <Frown {...iconProps} />
            case 3:
                return <Meh {...iconProps} />
            case 4:
                return <Smile {...iconProps} />
            case 5:
                return <Laugh {...iconProps} />
            default:
                return null
        }
    }

    const getMoodStylesForButton = (rating: number, enabled: boolean) => {
        if (!enabled) {
            return ''
        }

        return getMoodStyles(rating)
    }

    return (
        <Button
            onClick={() => onChange(rating)}
            variant={enabled ? 'default' : 'outline'}
            className={cn('h-20 w-20 p-2 transition-all duration-200', 'hover:bg-gray-600', 'bg-gray-500', getMoodStylesForButton(rating, enabled))}>
            {getIcon()}
        </Button>
    )
}
