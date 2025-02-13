import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";


const baseURL = import.meta.env.VITE_APP_BACKEND_URL;

const UsePrivateApi = () => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const accessToken = useSelector((state) => state.auth.accessToken);

    const axiosInstance = axios.create({
        baseURL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });

    const get = async (endpoint, queryParams = {}) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(endpoint, {
                params: queryParams,
            });
            setData(response?.data);
        } catch (err) {
            setError(err?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoading(false);
        }
    }

    const post = async (endpoint, data) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(endpoint, data);
            setData(response?.data);
        } catch (err) {
            console.log(err);
            setError(err?.response?.data?.message || "Internal Server error");
        } finally {
            setLoading(false);
        }
    }

    const put = async (endpoint, data, queryParams) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(endpoint, data, {
                params: queryParams,
            });
            setData(response?.data);
        } catch (err) {
            setError(err?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoading(false);
        }
    }

    const patch = async (endpoint, data, queryParams) => {
        try {
            setLoading(true);
            const response = await axiosInstance.patch(endpoint, data, {
                params: queryParams,
            });
            setData(response?.data);
        } catch (err) {
            setError(err?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoading(false);
        }
    }

    const del = async (endpoint, queryParams) => {
        try {
            setLoading(true);
            const response = await axiosInstance.delete(endpoint, {
                params: queryParams,
            });
            setData(response?.data);
        } catch (err) {
            setError(err?.response?.data?.message || "Internal Server Error");
        } finally {
            setLoading(false);
        }
    }

    return { get, post, put, patch, del, data, loading, error };
}

export default UsePrivateApi;