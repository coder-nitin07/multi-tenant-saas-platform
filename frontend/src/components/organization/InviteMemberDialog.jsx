import useOrganization from "@/hooks/useOrganization";
import invitationSchema from "@/validations/invitation.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import InviteMemberForm from "./InviteMemberForm";

function InviteMemberDialog({ open, onOpenChange, organizationId }){
    const [ isLoading, setIsLoading ] = useState(false);
    const { inviteMember } = useOrganization();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(invitationSchema)
    });

    const onSubmit = async (data)=>{
        setIsLoading(true);

        try {
            const response = await inviteMember(
                organizationId,
                data
            );

            toast.success(response.message);

            reset();

            onOpenChange(false);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                'Something went wrong'
            );
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            open={ open }
            onOpenChange={(value)=>{
                onOpenChange(value);

                if(!value){
                    reset();
                }
            }}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite Member
                    </DialogTitle>

                    <DialogDescription>
                        Invite an existing user to join your organization.
                    </DialogDescription>
                </DialogHeader>

                <InviteMemberForm
                    register={ register }
                    errors={ errors }
                    handleSubmit={ handleSubmit }
                    onSubmit={ onSubmit }
                    isLoading={ isLoading }
                    submitText="Send Invitation"
                />
            </DialogContent>
        </Dialog>
    )
};

export default InviteMemberDialog;