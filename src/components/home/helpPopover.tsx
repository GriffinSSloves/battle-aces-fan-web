import { CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface HelpPopoverProps {
    size?: number
    lineHeight?: number
}

export const HelpPopover = ({ size = 32, lineHeight = 48 }: HelpPopoverProps) => {
    const buttonHeight = lineHeight / 4
    const buttonHeightClassName = `h-${buttonHeight}`

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='ghost' size='icon' className={cn(`${buttonHeightClassName} relative top-0 right-0 self-start`)}>
                    <CircleHelp className='text-white' size={size} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-80'>
                <div className='space-y-2'>
                    <h4 className='font-medium leading-none'>What is this?</h4>
                    <p className='text-sm text-muted-foreground'>
                        This is a fan-made site where you rate the units and matchups of the brand-new game Battle Aces! <br />
                        <br />
                        We will share all of your feedback with the developers to help the game improve{' '}
                    </p>
                </div>
            </PopoverContent>
        </Popover>
    )
}
