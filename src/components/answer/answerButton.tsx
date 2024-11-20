import { Angry, Frown, Meh, Smile, Laugh } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AnswerButtonProps {
    rating: number
    currentValue: number
    onChange: (value: number) => void
}

export const AnswerButton = ({ rating, currentValue, onChange }: AnswerButtonProps) => {
    const enabled = rating === currentValue

    const getIcon = () => {
        const iconProps = {
            size: 64,
            className: ` ${enabled ? 'text-primary-foreground' : ''} transition-all`
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

    return (
        <Button onClick={() => onChange(rating)} size='icon' className='h-16 w-16 p-2'>
            {getIcon()}
        </Button>
    )
}
