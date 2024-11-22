import { ComponentType } from 'react'
import { FallbackProps } from 'react-error-boundary'

export const AceErrorFallback: ComponentType<FallbackProps> = ({ error, resetErrorBoundary }) => {
    const logError = () => {
        console.log('Error logged', error)
    }

    return (
        <div>
            <h1>Something went wrong, our bad.</h1>
            <button onClick={resetErrorBoundary}>Try again?</button>
        </div>
    )
}
