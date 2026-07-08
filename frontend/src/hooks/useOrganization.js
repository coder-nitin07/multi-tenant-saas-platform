import { OrganizationContext } from "@/context/OrganizationContext";
import useContext from "react";

function useOrganization(){
    return useContext(OrganizationContext);
};

export default useOrganization;