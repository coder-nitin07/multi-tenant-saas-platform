import CreateOrganizationDialog from "@/components/organization/CreateOrganizationDialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Organizations(){
    const [ open, setOpen ] = useState(false);

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
            <div>
                <p className="text-slate-500">
                    No organizations found.
                </p>
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