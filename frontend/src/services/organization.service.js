import api from "@/lib/axios";

const createOrganization = async (data) =>{
    const response = await api.post('/createOrganization', data);
    
    return response.data;
};

const getOrganization = async () =>{
    const response = await api.get('/getOrganization');

    return response.data;
};

const getOrganizationById = async (id) =>{
    const response = await api.get(`/getOrganizationById/${id}`);

    return response.data;
};

export { createOrganization, getOrganization, getOrganizationById };