import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";


const baseURL = import.meta.env.VITE_APP_BACKEND_URL;

const UsePrivateApi = ()=>{
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const accessToken = useSelector((state)=>state.auth.accessToken);

    const axiosInstance = axios.create({
        baseURL,
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    const get = async (endpoint, queryParams)=>{}
    const post = async (endpoint, data)=>{
        const response = await axiosInstance.post(endpoint, data);
    }
    const put = async (endpoint, data, queryParams)=>{}
    const patch = async (endpoint, data, queryParams)=>{}
    const del = async (endpoint, queryParams)=>{}

    return {get, post, put, patch, del, data, loading, error};
}

export default UsePrivateApi;