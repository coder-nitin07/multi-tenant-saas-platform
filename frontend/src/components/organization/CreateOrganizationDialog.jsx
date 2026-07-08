import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrganizationForm from "./OrganizationForm.jsx";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import organizationSchema from "@/validations/organization.validation.js";

function CreateOrganizationDialog({ open, onOpenChange }){
    const [ isLoading, setIsLoading ] = useState(false);

    const { register, handleSubmit, formState: { errors } , reset } = useForm({
        resolver: zodResolver(organizationSchema)
    });

    const onSubmit = async (data)=>{
        setIsLoading(true);

        try {
            console.log(data);

            reset();
            onOpenChange(false);
        } catch (error) {
            console.error(error);
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