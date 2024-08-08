import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData:{}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action)=>{
            state.userData = action.payload.user;
        },
        unSetUser: (state)=>{
            state.userData = {};
        },
    }
});

export const {setUser, unSetUser} = userSlice.actions;

export default userSlice.reducer;

