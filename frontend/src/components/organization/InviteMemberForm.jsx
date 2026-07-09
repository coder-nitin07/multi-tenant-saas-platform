import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function InviteMemberForm({ register, errors, handleSubmit, onSubmit, isLoading, submitText }){
    return (
        <form
            onSubmit={ handleSubmit(onSubmit) }
            className="space-y-4"
        >
            <div>
                <Label>Email Address</Label>

                <Input 
                    type="email"
                    placeholder="Enter member email"
                    {...register("email")}
                />

                { errors.email && (
                     <p className="text-sm text-red-500 mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <Button
                className='w-full'
                disabled={ isLoading }
            >
                { isLoading ? "Sending..." : submitText }
            </Button>
        </form>
    )
};

export default InviteMemberForm;