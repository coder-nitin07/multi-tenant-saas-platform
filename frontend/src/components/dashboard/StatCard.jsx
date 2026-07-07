import { Card, CardContent } from "../ui/card";

function StatCard({ title, value, icon: Icon }){
    return (
        <Card className="shadow-sm border-neutral-700">
            <CardContent className='p-6'>
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-sm text-slate-500">
                            { title }
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            { value }
                        </h2>
                    </div>

                    <Icon className="w-8 h-8 text-slate-600" />
                </div>
            </CardContent>
        </Card>
    )
};

export default StatCard;