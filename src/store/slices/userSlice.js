import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    users: [],
    isUsersLoad: false,
    isUsersError: null,
    selectUsersId : null,
}

export const fetchUserData = createAsyncThunk(
    "user/fetchUserData",
    async (url) => {
        const res = await axios.get(url)
        console.log(res)
        return res.data
    }
)

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setSelectUserId : (state, action) => {
            state.selectDestId = action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.isUsersLoad = true
        }).addCase(fetchUserData.fulfilled, (state, action) => {
            state.isUsersLoad = false;
            state.users = action.payload
        }).addCase(fetchUserData.rejected, (state, action) => {
            state.isUsersLoad = false;
            state.isUsersError = action.error.message
        })
    }
})


export const {setSelectUsertId} = userSlice.actions 
export default userSlice.reducer