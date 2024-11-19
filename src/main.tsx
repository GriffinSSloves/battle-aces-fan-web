import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import { GErrorBoundary } from './components/app/GErrorBoundary.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary FallbackComponent={GErrorBoundary}>
            <App />
        </ErrorBoundary>
    </StrictMode>
)