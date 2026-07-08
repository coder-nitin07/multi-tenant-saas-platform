import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrganizationForm from "./OrganizationForm.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import organizationSchema from "@/validations/organization.validation.js";
import { createOrganization, getOrganization } from "@/services/organization.service.js";
import toast from "react-hot-toast";
import useOrganization from "@/hooks/useOrganization.js";

function CreateOrganizationDialog({ open, onOpenChange }){
    const [ isLoading, setIsLoading ] = useState(false);
    const { getOrganizations } = useOrganization();

    const { register, handleSubmit, formState: { errors } , reset } = useForm({
        resolver: zodResolver(organizationSchema)
    });

    const onSubmit = async (data)=>{
        setIsLoading(true);

        try {
            const response = await createOrganization(data);

            await getOrganizations();
            toast.success(response.message);

            reset();
            onOpenChange(false);
        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Something went wrong'
            )
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <Dialog 
            open={ open }
            onOpenChange={(value)=>{
                if(!value){
                    reset();
                }

                onOpenChange(value);
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Orgnization
                    </DialogTitle>

                    <DialogDescription>
                        Create a new organization to start collabrating with your team.
                    </DialogDescription>
                </DialogHeader>

                <OrganizationForm
                    register={ register }
                    errors={ errors }
                    handleSubmit={ handleSubmit }
                    onSubmit={ onSubmit }
                    isLoading={ isLoading }
                    submitText='Create Organization'
                />
            </DialogContent>
        </Dialog>
    )
};

export default CreateOrganizationDialog;