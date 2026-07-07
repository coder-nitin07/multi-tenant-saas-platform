import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

function QuickActions(){
    const navigate = useNavigate();

    return (
        <Card> 
            <CardHeader>
                <CardTitle>
                    Quick Actions
                </CardTitle>
            </CardHeader>

            <CardContent className='space-y-3'>
                <Button
                    className='w-full'
                    onClick={()=> navigate('/organizations') }
                >
                    Create Organization
                </Button>

                <Button
                    variant="outline"
                    className='w-full'
                    onClick={()=> navigate('/invitations') }
                >
                    Invite Members
                </Button>

                <Button
                    variant="secondary"
                    className='w-full'
                    onClick={()=> navigate('/notifications') }
                >
                    View Notifications
                </Button>
            </CardContent>
        </Card>
    )
};

export default QuickActions;