import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { fetchNewAccessToken } from "../pages/auth/api/auth";
import { setLogin } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";
import Loader from "../utils/Loader";

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
                setIsLoading(false);
            }catch(err){
                setIsError(err.response.data?.message || "Internal Server Error");
                // setIsError(true);
            }finally{
                setIsLoading(false);
            }
        }
        if(!isAuth){
            getNewAT();
        }else{
            setIsLoading(false);
        }
    }, [isLoading]);

    // console.log(isError );

    if(isError){
        return <Navigate to="/login" />;
    }
    return <>{isLoading?<Loader/> : <Outlet/>}</>;
}

export default UsePersistLogin;