import { useContext } from "react";
import { NotificationContext } from "@/context/NotificationContext";

function useNotification() {
    return useContext(NotificationContext);
}

export default useNotification;