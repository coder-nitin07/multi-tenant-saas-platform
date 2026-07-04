import useAuth from "@/hooks/useAuth";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

function TopBar(){
    const { user, logout } = useAuth();

    const handleLogout = async ()=>{
        try {
            await logout();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="h-16 border-b bg-white flex items-center justify-between">
            {/* left */}
            <h1 className="text-xl font-semibold">
                Dashboard
            </h1>

            {/* right */}
            <div className="flex items-center gap-4">
                <Bell className="cursor-pointer" />

                <span className="text-sm">
                    { user?.email }
                </span>

                <Button
                    varient='outline'
                    onClick={ handleLogout }
                >
                    Logout
                </Button>
            </div>
        </header>
    )
}

export default TopBar;