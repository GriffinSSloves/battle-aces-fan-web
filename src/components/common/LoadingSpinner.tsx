import React from 'react'
import { Loader } from 'lucide-react'

export interface ILoadingSpinnerProps {
    size?: number
    className?: string
}

export const LoadingSpinner = ({ size = 24, className = '' }: ILoadingSpinnerProps) => {
    return (
        <div className='flex items-center justify-center'>
            <Loader className={`animate-spin ${className}`} size={size} />
        </div>
    )
}
