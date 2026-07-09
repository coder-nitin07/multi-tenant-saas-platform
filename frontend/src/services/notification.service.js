import api from "@/lib/axios";

const getNotifications = async ()=>{
    const response = await api.get('/getNotifications');

    return response.data;
};

export { getNotifications };