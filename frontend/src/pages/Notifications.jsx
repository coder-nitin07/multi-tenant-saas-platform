import useNotification from "@/hooks/useNotification";
import { useEffect } from "react";

function Notifications(){
    const { notifications, getNotifications } = useNotification();

    useEffect(()=>{
        getNotifications();
    }, []);

    return (
        <div className="space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Notification
                </h1>

                <p className="text-slate-500 mt-1">
                    Stay updated wiht your latest activity.
                </p>
            </div>

            {/* notification list */}
            { notifications.length === 0 ? (
                <div className="border rounded-lg p-6 text-center">
                    <div className="text-slate-500">
                        No notification found.
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    { notifications.map((notification)=>(
                        <div
                            key={ notification.id }
                            className="border rounded-lg p-5"
                        >
                            <h2 className="font-semibold">
                                { notification.title }
                            </h2>

                            <p className="text-slate-500 mt-2">
                                { notification.message }
                            </p>

                            <p className="text-sm text-slate-400 mt-3">
                                { new Date(
                                    notification.createdAt
                                ).toLocaleString() }
                            </p>
                        </div>
                    )) }
                </div>
            ) }
        </div>
    )
};

export default Notifications;