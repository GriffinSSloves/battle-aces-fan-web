import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouteError } from 'react-router-dom'

export const ErrorPage = () => {
    const [bugReported, setBugReported] = useState(false)

    const error = useRouteError()
    console.error(error)

    const logError = () => {}

    const goToRandomPage = () => {}

    return (
        <div>
            <h1>404</h1>
            <p>Page not found</p>
            <Button onClick={logError}>Report bug</Button>
            {bugReported && <p>Bug reported. Thanks!</p>}
        </div>
    )
}
