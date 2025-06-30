import ComingSoon from '@/components/coming-soon'
import Header from '@/components/header'
import { SidebarInset } from '@/components/ui/sidebar'

function page() {
    return (
        <SidebarInset className="h-[100vh] overflow-hidden">
            <Header />
            <ComingSoon />
        </SidebarInset>
    )
}

export default page