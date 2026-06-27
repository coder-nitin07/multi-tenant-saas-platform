import api from "@/lib/axios";

const register = async (userData) =>{
    const response  = await api.post('/auth/register', userData);

    return response.data;
};

const login = async (userData) =>{
    const response = await api.post('/login', userData);

    return response.data;
};

const logout = async () =>{
    const response = await api.post('/auth/logout');

    return response.data;
};

const refreshToken = async () =>{
    const response = await api.post('/auth/refresh-token');

    return response.data;
};

export { register, login, logout, refreshToken };