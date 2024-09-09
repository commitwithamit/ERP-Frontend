import { createContext, useState } from "react";

const TeamCtx = createContext({
    roles: [],
    depts: [],
});

export const TeamContext = ({ children }) => {
    const [roles, setRoles] = useState([]);
    const [depts, setDepts] = useState([]);

    const addRoleHandler = (newRoles) => {
        /*
        when we get the role list from db initially in the form of an "array" which
        is why we used .length method 
        */
        if(newRoles?.length > 0){
            setRoles(() => [...newRoles]);
        }else if(newRoles.length === 0){
            setRoles("");
        }
        /*
        when we create another role and that new role is in the form of an "object"
        */
        else{
            setRoles((prevstate) => [...prevstate, newRoles]);
        }
    }

    const addDeptHandler = (newDepts) => {
        if(newDepts?.length > 0){
            setDepts(() => [...newDepts]);
        }else if(newDepts.length === 0){
            setDepts("");
        }
        else{
            setDepts((prevstate) => [...prevstate, newDepts]);
        }
    }
    return (
        <TeamCtx.Provider value={{ roles, addRoleHandler, depts, addDeptHandler }}>
            {children}
        </TeamCtx.Provider>
    )
}


export default TeamCtx;
