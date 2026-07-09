import StatCard from "@/components/dashboard/StatCard";
import InviteMemberDialog from "@/components/organization/InviteMemberDialog";
import { Button } from "@/components/ui/button";
import useOrganization from "@/hooks/useOrganization";
import { Badge, Mail, ShieldCheck, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function OrganizationDetails(){
    const { id } = useParams();

    const { selectedOrganization, getOrganizationById, members, getOrganizationMembers } = useOrganization();
    const [ open, setOpen ] = useState(false);

    useEffect(()=>{
        getOrganizationById(id),
        getOrganizationMembers(id)
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
                    value={ members.length }
                    icon={ Users }
                />

                <StatCard
                    title="Pending Invitations"
                    value={ 0 }
                    icon={ Mail }
                />
            </div>

            {/* Organization Members */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Organization Members
                </h2>

                {members.length === 0 ? (
                    <p className="text-slate-500">
                        No members found.
                    </p>
                ) : (
                    members.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center justify-between border rounded-lg p-4"
                        >
                            <div>
                                <p className="font-medium">
                                    {member.user.email}
                                </p>

                                <p className="text-sm text-slate-500">
                                    Joined: {new Date(member.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <span className="font-semibold">
                                {member.role}
                            </span>
                        </div>
                    ))
                )}

            </div>


            {/*actions */}
            <div className="flex justify-end">
                <Button
                    onClick={ ()=> setOpen(true) }
                >
                    Invite Member
                </Button>

                <InviteMemberDialog
                    open={open}
                    onOpenChange={setOpen}
                    organizationId={id}
                />
            </div>
        </div>
    )
};

export default OrganizationDetails;