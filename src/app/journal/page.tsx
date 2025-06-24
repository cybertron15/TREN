import Header from '@/components/header'
import { SidebarInset } from '@/components/ui/sidebar'

function page() {
    return (
        <SidebarInset className="h-[100vh] overflow-hidden">
            <Header />
        </SidebarInset>
    )
}

export default page