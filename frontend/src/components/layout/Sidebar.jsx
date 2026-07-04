import sidebarItems from "@/config/sidebar"
import SidebarItem from "./SidebarItem"

function Sidebar(){
  return(
    <aside className="w-64 border-r bg-white flex flex-col">
        {/* logo */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">SaaS App</h1>
        </div>

        {/* navidation */}
        <nav className="flex-1 p-4 space-y-2">
          { sidebarItems.map((item)=>(
            <SidebarItem
                key={ item.path }
                title={ item.title }
                path={ item.path }
                icon={ item.icon }
            />
          )) }
        </nav>
    </aside>
  )
}

export default Sidebar;