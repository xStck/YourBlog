import { configureStore, createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {isLoggedIn: false, firstPage: 0},
    reducers: {
        login(state){
            state.isLoggedIn = true;
        },
        logout(state){
            localStorage.removeItem("userId");
            state.isLoggedIn = false;
        },
        changeUnderlineHeader0(state){
            state.firstPage = 0
        },
        changeUnderlineHeader1(state){
            state.firstPage = 1
        },
        changeUnderlineHeader2(state){
            state.firstPage = 2
        },
    },
});

export const authActions = authSlice.actions; 

export const store = configureStore({
    reducer: authSlice.reducer
})