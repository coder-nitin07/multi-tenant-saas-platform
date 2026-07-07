import StatCard from "@/components/dashboard/StatCard";
import { Bell, Building2, Mail, Users } from "lucide-react";

function Dashboard(){
  return (
    <div className="space-y-2">
      {/* welcome section */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome Back
        </h1>

        <p className="text-slate-500 mt-2">
          Here's an overview of your workspace.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard 
            title='Organizations'
            value={4}
            icon={ Building2 }
        />

        <StatCard 
            title='Members'
            value={28}
            icon={ Users }
        />

        <StatCard 
            title='Invitations'
            value={6}
            icon={ Mail }
        />

        <StatCard 
            title='Notifications'
            value={3}
            icon={ Bell }
        />
      </div>
    </div>
  )
};

export default Dashboard;