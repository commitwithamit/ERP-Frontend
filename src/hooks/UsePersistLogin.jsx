import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { fetchNewAccessToken } from "../pages/auth/api/auth";
import { setLogin } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";

const UsePersistLogin = () => {
    const isAuth = useSelector((state)=> state.auth.isAuth);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(()=>{
        const getNewAT = async()=>{
            try{
                const response = await fetchNewAccessToken();

                dispatch(setLogin({accessToken: response.data.accessToken}));
                dispatch(setUser(({user: response.data.user})));
            }catch(err){
                setIsError(true);
            }finally{
                setIsLoading(false);
            }
        }

        if(!isAuth){
            getNewAT();
        }else{
            setIsLoading(false);
        }
    }, []);

    if(isError){
        return <Navigate to="/login"/>;
    }
    return <>{isLoading?<div>Loading...</div> : <Outlet/>}</>;
}

export default UsePersistLogin;