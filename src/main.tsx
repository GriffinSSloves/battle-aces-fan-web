import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from 'react-error-boundary'
import { AceErrorFallback } from './components/app/AceErrorFallback.tsx'

createRoot(document.getElementById('root')!).render(
    <ErrorBoundary FallbackComponent={AceErrorFallback}>
        <App />
    </ErrorBoundary>
)
