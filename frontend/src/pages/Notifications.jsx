import { Button } from "@/components/ui/button";
import useNotification from "@/hooks/useNotification";
import useOrganization from "@/hooks/useOrganization";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Notifications(){
    const { notifications, getNotifications, acceptInvitation } = useNotification();

    const { getOrganizations } = useOrganization();

    useEffect(()=>{
        getNotifications();
    }, []);

     const handleAcceptInvitation = async (token) => {

        try {

            const response = await acceptInvitation(token);

            toast.success(response.message);

            // Refresh organizations
            await getOrganizations();

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Something went wrong."
            );

        }

    };

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

                            {/* Accept Invitation */}
                            { notification.type === "INVITATION_SENT" &&
                                notification.metadata?.token && (

                                    <Button
                                        className="mt-4"
                                        onClick={() =>
                                            handleAcceptInvitation(
                                                notification.metadata.token
                                            )
                                        }
                                    >
                                        Accept Invitation
                                    </Button>

                            )}
                        </div>
                    )) }
                </div>
            ) }
        </div>
    )
};

export default Notifications;