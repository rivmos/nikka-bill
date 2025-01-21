import Views from '@/views/Views'
import SideNav from '../template/SideNav'


const ModernLayout = () => {
    return (
        <div className="app-layout-modern flex flex-auto flex-col">
            <div className="flex flex-auto min-w-0">
                <SideNav />
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                    <Views />
                </div>
            </div>
        </div>
    )
}

export default ModernLayout
