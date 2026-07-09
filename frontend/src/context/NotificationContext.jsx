import { getNotifications as getNotificationsService } from "@/services/notification.service";
import { createContext, useState } from "react";

const NotificationContext = createContext();

function NotificationProvider({ children }){
    const [ notifications, setNotifications ] = useState([]);

    const getNotifications = async ()=>{
        const response = await getNotificationsService();

        setNotifications(response.data || []);

        return response;
    };

    return(
        <NotificationContext.Provider
            value={{
                notifications,
                getNotifications
            }}
        >
            { children }
        </NotificationContext.Provider>
    )
};

export { NotificationContext }; 
export default NotificationProvider;