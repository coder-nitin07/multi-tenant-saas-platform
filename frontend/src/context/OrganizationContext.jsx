import { createOrganization as createOrganizationService } from "@/services/organization.service";
import createContext from "react";

const OrganizationContext = createContext();

function OrganizationProvider({ children }){
    const createOrganization = async (data) =>{
        const response = await createOrganizationService(data);

        return response;
    };

    return (
        <OrganizationContext.Provider
            value={{
                createOrganization
            }}
        >
            { children }
        </OrganizationContext.Provider>
    )
};

export { OrganizationContext };
export default OrganizationProvider;