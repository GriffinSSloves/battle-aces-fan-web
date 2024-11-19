import { RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'
import { AppRouter } from './lib/router'
import { useEffect } from 'react'

function App() {
    useEffect(() => {
        // Load session data from local storage / cookies
    }, [])

    return (
        <div>
            <RouterProvider router={AppRouter} future={{ v7_startTransition: true }} />
        </div>
    )
}

export default App
