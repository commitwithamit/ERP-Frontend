import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    accessToken: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setLogin: (state, action)=>{
            state.isAuth = true,
            state.accessToken = action.payload.accessToken;
        },
        setLogout: (state) =>{
            state.isAuth = false;
            state.accessToken = "";
        }
    }
});

export const {setLogin, setLogout} = authSlice.actions;

export default authSlice.reducer;

