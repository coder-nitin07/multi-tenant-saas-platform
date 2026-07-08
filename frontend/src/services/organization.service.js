import api from "@/lib/axios";

const createOrganization = async (data) =>{
    const response = await api.post('/organizations', data);

    return response.data;
};

export default createOrganization;