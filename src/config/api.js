import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const RegisterUser = "https://dev-olshop.berkatsoft.com/api/register"
export const GetProduct = "https://dev-olshop.berkatsoft.com/api/product"
export const GetBanner = "https://dev-olshop.berkatsoft.com/api/banner"
export const GetColor = "https://dev-olshop.berkatsoft.com/api/color"
export const GetBrand = "https://dev-olshop.berkatsoft.com/api/brand"
export const GetCategory = "https://dev-olshop.berkatsoft.com/api/product-category"

const initialState = {
    user : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
}

export let token = ""
export let config = {}

export const LoginUser = createAsyncThunk("user/loginUser", async(user, thunkAPI)=>{
    try {
        const response = await axios.post("https://dev-olshop.berkatsoft.com/api/login", {
            email: user.email,
            password: user.password
        })
        token = response.data.data.token;
        localStorage.setItem('token', token);
        config = { headers: { Authorization: `Bearer ${token}` } }
        console.log("data config : ",config)
        return response.data;
    } catch (error) {
        if(error.response){
            console.log(error.response)
            const message = error.response.data.errors.email[0];
            console.log('message :', message)
            return thunkAPI.rejectWithValue(message);
        }
    }
})




export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI)=>{
    try {
        const response = await axios.get("https://dev-olshop.berkatsoft.com/api/user",config)
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
})

export const LogOut = createAsyncThunk("user/LogOut", async()=>{
    await axios.post("https://dev-olshop.berkatsoft.com/api/logout")
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder) =>{
        builder.addCase(LoginUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(LoginUser.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })

        //get User Login

        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getMe.fulfilled, (state, action) =>{
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;
