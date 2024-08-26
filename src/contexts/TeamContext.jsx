import { createContext, useState } from "react";

const TeamCtx = createContext({
    roles: [],
    depts: [],
});

export const TeamContext = ({ children }) => {
    const [roles, setRoles] = useState([]);
    const [depts, setDepts] = useState([]);

    const addRoleHandler = (newRoles) => {
        if(newRoles?.length > 0){
            setRoles(() => [...newRoles]);
        }else{
            setRoles((prevstate) => [...prevstate, newRoles]);
        }
    }

    const addDeptHandler = (newDepts) => {
        if(newDepts?.length > 0){
            setRoles(() => [...newDepts]);
        }else{
            setRoles((prevstate) => [...prevstate, newDepts]);
        }
    }
    return (
        <TeamCtx.Provider value={{ roles, addRoleHandler, depts, addDeptHandler }}>
            {children}
        </TeamCtx.Provider>
    )
}


export default TeamCtx;
