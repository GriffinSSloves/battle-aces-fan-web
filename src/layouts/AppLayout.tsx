import { Outlet } from 'react-router-dom'
import { AppFooter } from './AppFooter'
import { AppHeader } from './AppHeader'

export const AppLayout = () => {
    return (
        <div className='h-screen md:h-auto md:min-h-screen w-full flex flex-col bg-[url("/images/bg/bg_grid.png")] bg-[length:800px] overflow-x-hidden'>
            <AppHeader />
            <main className='flex-grow w-full container mx-auto max-w-6xl px-4 pt-8 pb-4 flex flex-col'>
                <Outlet />
            </main>
            <AppFooter />
        </div>
    )
}
