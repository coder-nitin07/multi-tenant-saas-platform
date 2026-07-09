import StatCard from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import useOrganization from "@/hooks/useOrganization";
import { Badge, Mail, ShieldCheck, Star, Users } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function OrganizationDetails(){
    const { id } = useParams();

    const { selectedOrganization, getOrganizationById } = useOrganization();
    
    useEffect(()=>{
        getOrganizationById(id)
    }, [ id ]);

    console.log(selectedOrganization, "select");
    if(!selectedOrganization){
        return <p>Loading...</p>
    }
    return (
        <div className="space-y-8">
            
            {/* header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        { selectedOrganization.organization.name }
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage your organization, members and settings.
                    </p>
                </div>

                <Badge className="px-4 py-2 text-sm">
                    { selectedOrganization.role }
                </Badge>
            </div>

            {/* Stats */}
            <div className="grid gap-5 md:grid-cols-3">
                <StatCard
                    title="Your Role"
                    value={ selectedOrganization.role }
                    icon={ ShieldCheck }
                />

                <StatCard
                    title='Members'
                    value={1}
                    icon={ Users }
                />

                <StatCard
                    title="Pending Invitations"
                    value={ 0 }
                    icon={ Mail }
                />
            </div>


            {/*actions */}
            <div className="flex justify-end">
                <Button>
                    Invite Member
                </Button>
            </div>
        </div>
    )
};

export default OrganizationDetails;