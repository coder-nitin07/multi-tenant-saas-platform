import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";

function OrganizationForm({ register, errors, onSubmit, handleSubmit, isLoading, submitText }){
    return(
        <form
            onSubmit={ handleSubmit(onSubmit) }
            className="space-y-4"
        >
            <div>
                <Label>Organization Name</Label>

                <Input 
                    placeholder='Enter organization name'
                    { ...register('name') }
                />

                { errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        { errors.name.message }
                    </p>
                ) }
            </div>

            <div>
                <Label>Description</Label>

                <Textarea
                    placeholder='Enter description'
                    { ...register('description') }
                />

                { errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                        { errors.description.message }
                    </p>
                ) }
            </div>

            <Button
                className='w-full'
                disabled={ isLoading }
            >
                { isLoading ? 'Loading...' : submitText }
            </Button>
        </form>
    )
};

export default OrganizationForm;