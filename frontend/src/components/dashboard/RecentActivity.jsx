import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function RecentActivity(){
    const activities = [
        "Organization 'Acme' created",
        "John invited to Marketing Team",
        "Sarah accepted invitation",
        "Role updated for Alex",
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Recent Activity
                </CardTitle>
            </CardHeader>

            <CardContent>
                <ul className="space-y-3">
                    { activities.map((activity, index)=>(
                       <li
                            key={ index } 
                            className="text-sm text-slate-600"
                       >
                            { activity }
                       </li>     
                    )) }
                </ul>
            </CardContent>
        </Card>
    )
};

export default RecentActivity;