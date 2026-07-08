import { 
    createOrganization as createOrganizationService, 
    getOrganization as getOrganizationsService,
    getOrganizationById as getOrganizationByIdService
} from "@/services/organization.service";
import { createContext, useState } from "react";

const OrganizationContext = createContext();

function OrganizationProvider({ children }){
    const [ organizations, setOrganizations ] = useState([]);

    const createOrganization = async (data) =>{
        const response = await createOrganizationService(data);

        return response;
    };

    const getOrganizations = async ()=>{
        const response = await getOrganizationsService();
        console.log(response, "this is response")
        setOrganizations(response.getOrganizations);

        return response;
    };

    const getOrganizationById = async (id)=>{
        const response = await getOrganizationByIdService(id);

        return response;
    };

    return (
        <OrganizationContext.Provider
            value={{
                organizations,
                createOrganization,
                getOrganizations,
                getOrganizationById
            }}
        >
            { children }
        </OrganizationContext.Provider>
    )
};

export { OrganizationContext };
export default OrganizationProvider;