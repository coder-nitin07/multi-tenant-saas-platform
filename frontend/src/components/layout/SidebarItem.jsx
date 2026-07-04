import { NavLink } from "react-router-dom";

function SidebarItem({ title, path, icon: Icon }){
    return (
        <NavLink 
            to={ path }
            className={({ isActive })=>
                `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    isActive
                        ? "bg-slate-600 text-white"
                        : "text-slate-600 hover:bg-slate-300"
                }`
            }
        >
            <Icon size={ 20 } />

            <span>{ title }</span>
        </NavLink>
    )
};

export default SidebarItem;