import CreateOrganizationDialog from "@/components/organization/CreateOrganizationDialog";
import { Button } from "@/components/ui/button";
import useOrganization from "@/hooks/useOrganization";
import { useEffect, useState } from "react";

function Organizations(){
    const [ open, setOpen ] = useState(false);
    const { organizations, getOrganizations } = useOrganization();

    useEffect(()=>{
        getOrganizations();
    }, []);

    return (
        <div className="space-y-6">
            {/* page header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">
                        Organizations
                    </h1>

                    <p className="text-slate-500 mt-1">
                        Manage your organizations and members.
                    </p>
                </div>

                <Button onClick={()=> setOpen(true) }>
                    Create Organization
                </Button>
            </div>

            {/* Organization List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                { organizations.length === 0 ? (
                    <p className="text-slate-500">
                        No organizations found.
                    </p>
                ) : (
                    organizations.map((items)=> (
                        <div
                            key={ items.organization.id }
                            className="border rounded-lg p-5 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold">
                                { items.organization.name }
                            </h2>

                            <p className="text-sm text-slate-500 mt-2">
                                Role: { items.role }
                            </p>
                        </div>
                    ))
                ) }
            </div>

            {/* Dialog */}
            <CreateOrganizationDialog 
                open={ open }
                onOpenChange={ setOpen }
            />
        </div>
    )
};

export default Organizations;