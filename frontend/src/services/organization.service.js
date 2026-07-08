import api from "@/lib/axios";

const createOrganization = async (data) =>{
    const response = await api.post('/createOrganization', data);
    console.log(response, "sd");
    return response.data;
};

export { createOrganization };