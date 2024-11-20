import { Outlet, useNavigation } from 'react-router-dom'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import { Suspense } from 'react'

// TODO: The min height is the height of the screen instead of the height of the content
export const AppLayout = () => {
    return (
        <div className='min-h-screen  flex flex-col'>
            <AppHeader />
            <main className='flex-grow'>
                <div className='container mx-auto max-w-6xl px-4 py-8'>
                    <Outlet />
                </div>
            </main>
            <AppFooter />
        </div>
    )
}
