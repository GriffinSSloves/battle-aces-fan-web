import { RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'
import { AppRouter } from './lib/router'
import { ResourceContextProvider } from './lib/ResourceContextProvider'
import { ResourceProvider } from './lib/resourceProvider'

function App() {
    const resourceProvider = ResourceProvider.create()

    return (
        <ResourceContextProvider resourceProvider={resourceProvider}>
            <AppRouter />
        </ResourceContextProvider>
    )
}

export default App
