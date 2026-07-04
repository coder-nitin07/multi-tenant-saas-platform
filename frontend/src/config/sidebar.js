import { LayoutDashboard, Building2, Users, Settings, ClipboardList, Bell, Mail } from "lucide-react";

const sidebarItems = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: LayoutDashboard
    },
    {
        title: 'Organizations',
        path: '/organizations',
        icon: Building2
    },
    {
        title: 'Members',
        path: '/members',
        icon: Users
    },
    {
        title: "Invitations",
        path: "/invitations",
        icon: Mail
    },
    {
        title: "Notifications",
        path: "/notifications",
        icon: Bell
    },
    {
        title: "Audit Logs",
        path: "/audit-logs",
        icon: ClipboardList
    },
    {
        title: "Settings",
        path: "/settings",
        icon: Settings
    }
];

export default sidebarItems;