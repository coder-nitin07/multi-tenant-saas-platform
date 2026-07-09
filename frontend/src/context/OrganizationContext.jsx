import { 
    createOrganization as createOrganizationService, 
    getOrganization as getOrganizationsService,
    getOrganizationById as getOrganizationByIdService,
    getOrganizationMembers as getOrganizationMembersService,
    inviteMember as inviteMemberService
} from "@/services/organization.service";
import { createContext, useState } from "react";

const OrganizationContext = createContext();

function OrganizationProvider({ children }){
    const [ organizations, setOrganizations ] = useState([]);
    const [ selectedOrganization, setSelectedOrganization ] = useState(null);
    const [ members, setMembers ] = useState([]);

    const createOrganization = async (data) =>{
        const response = await createOrganizationService(data);

        return response;
    };

    const getOrganizations = async ()=>{
        const response = await getOrganizationsService();

        setOrganizations(response.getOrganizations || []);

        return response;
    };

    const getOrganizationById = async (id)=>{
        const response = await getOrganizationByIdService(id);

        setSelectedOrganization(response.data);

        return response;
    };

    const getOrganizationMembers = async (id) =>{
        const response = await getOrganizationMembersService(id);

        setMembers(response.members);

        return response;
    };

    const inviteMember = async (organizationId, data)=>{
        const response = await inviteMemberService(
            organizationId, 
            data
        );

        return response;
    };

    return (
        <OrganizationContext.Provider
            value={{
                organizations,
                selectedOrganization,
                members,

                createOrganization,
                getOrganizations,
                getOrganizationById,
                getOrganizationMembers,

                inviteMember
            }}
        >
            { children }
        </OrganizationContext.Provider>
    )
};

export { OrganizationContext };
export default OrganizationProvider;