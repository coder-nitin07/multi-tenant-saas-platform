import { createContext, useState } from "react";
import { login as loginService } from "@/services/auth.service";

const AuthContext = createContext();

function AuthProvider({ children }){
    const [ user, setUser ] = useState(null);

    const login = async (credentials) =>{
        const data = await loginService(credentials);

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        setUser(data.user);
        
        return data;
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        setUser(null);
    };

    return (
        // React Context provides data using a prop called value.
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthProvider };
export default AuthContext;