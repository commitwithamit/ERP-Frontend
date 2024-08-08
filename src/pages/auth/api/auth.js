import axios from "axios";

const baseURL = import.meta.env.VITE_APP_BACKEND_URL;

export const login = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/api/auth/login`, data, {
            headers: {
                "Content-Type": "application/json", //compulsory to send this postman used to take care of it but here we have to send this manually to tell the type of data we are sending here its json
            },
            withCredentials: true
        });
        return response;
    } catch (err) {
        throw err;
    }
}

export const fetchNewAccessToken = async (data) => {
    try {
        const response = await axios.get(`${baseURL}/api/auth/refresh`,
            {
                withCredentials: true
            });
        return response;
    } catch (err) {
        throw err;
    }
}

// the below function is wrong because with get request we can't send data so 
// inside try block that {} is not needed the above function is correct

// export const fetchNewAccessToken = async (data) => {
//     try {
//         const response = await axios.get(`${baseURL}/api/auth/refresh`,
//             {},
//             {
//                 withCredentials: true
//             });
//         return response;
//     } catch (err) {
//         throw err;
//     }
// }

export const logout = async () => {
    try {
        await axios.post(
            `${baseURL}/api/auth/logout`,
            {},
            {
                withCredentials: true,
            }
        );
        return true;
    } catch (err) {
        throw err;
    }
}