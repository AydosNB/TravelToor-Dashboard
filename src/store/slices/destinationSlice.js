import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { fetchTourData } from "./tourSlice"
import { toggleModalAlert } from "./pageActionSlice"

const initialState = {
    destinations : [],
    isDestLoad : false,
    isDestError : null,
    selectDestId : null,
}

export const fetchDestData = createAsyncThunk(
    "destination/fetchDestData",
    async (url) => {
        const res = await axios.get(url)
        return res.data
    }
)

export const deleteDestData = createAsyncThunk(
    "destination/deleteDestData",
    async ({urlDest, id, tours},{dispatch}) => {
        const res = await axios.delete(`${urlDest}/${id}`)
        dispatch(fetchDestData(urlDest))
        if(res.statusText = "OK") {
            const deleteItems = tours.filter(item => item.destinationId == id)
            deleteItems.forEach(async (element) => {
                await axios.delete("http://localhost:3000/offers/"+element.id)
                await dispatch(fetchTourData("http://localhost:3000/offers"))
            });
        }
        return res.data
    }
)

export const updateDestData = createAsyncThunk(
    "destination/createDestData",
    async ({urlDest, id, updateData},{dispatch}) => {
        const res = await axios.put(`${urlDest}/${id}`,updateData)
        dispatch(fetchDestData(urlDest))
        dispatch(toggleModalAlert())
        return res.data
    }
)


export const createDestData = createAsyncThunk(
    "destination/createDestData",
    async ({urlDest, destData},{dispatch}) => {
        const res = await axios.post(urlDest,destData)
        dispatch(fetchDestData(urlDest))
        return res.data
    }
)




const destinationSlice = createSlice({
    name : "destination",
    initialState,
    reducers : {
        setSelectDestId : (state, action) => {
            state.selectDestId = action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchDestData.pending, (state) => {
            state.isDestLoad = true
        }).addCase(fetchDestData.fulfilled, (state, action) => {
            state.isDestLoad = false;
            state.destinations = action.payload
        }).addCase(fetchDestData.rejected, (state, action) => {
            state.isDestLoad = false;
            state.isDestError = action.error.message
        })

        builder.addCase(deleteDestData.pending, (state) => {
            state.isDestLoad = true;
        }).addCase(deleteDestData.fulfilled, (state) => {
            state.isDestLoad = false;

        }).addCase(deleteDestData.rejected, (state, action) => {
            state.isDestLoad = false;
        })

        builder.addCase(createDestData.pending, (state) => {
            state.isDestLoad = true;
        }).addCase(createDestData.fulfilled, (state) => {
            state.isDestLoad = false;
        }).addCase(createDestData.rejected, (state, action) => {
            state.isDestLoad = false;
            console.log(action.error.message)
        })

        
    }
})


export const {setSelectDestId} = destinationSlice.actions 
export default destinationSlice.reducer