import { getNotifications as getNotificationsService } from "@/services/notification.service";
import { acceptInvitation as acceptInvitationService, declineInvitation as declineInvitationService } from "@/services/organization.service";
import { createContext, useState } from "react";

const NotificationContext = createContext();

function NotificationProvider({ children }){
    const [ notifications, setNotifications ] = useState([]);

    const getNotifications = async ()=>{
        const response = await getNotificationsService();

        setNotifications(response.data || []);

        return response;
    };

    const acceptInvitation = async (token)=>{
        const response = await acceptInvitationService(token);

        await getNotifications();

        return response;
    };

    const declineInvitation = async (token)=>{
        const response = await declineInvitationService(token);

        await getNotifications();

        return response;
    };

    return(
        <NotificationContext.Provider
            value={{
                notifications,
                getNotifications,
                acceptInvitation,
                declineInvitation
            }}
        >
            { children }
        </NotificationContext.Provider>
    )
};

export { NotificationContext }; 
export default NotificationProvider;