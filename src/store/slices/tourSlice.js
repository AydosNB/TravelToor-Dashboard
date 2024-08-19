import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { toggleModalAlert } from "./pageActionSlice"

const initialState = {
    tours: [],
    isTourLoad: false,
    isTourError: null,
    selectTourId : null,
}

export const fetchTourData = createAsyncThunk(
    "tour/fetchDestData",
    async (url) => {
        const res = await axios.get(url)
        return res.data
    }
)

export const deleteTourData = createAsyncThunk(
    "tour/deleteTourData",
    async ({ urlTour, id }, { dispatch }) => {
        const res = await axios.delete(`${urlTour}/${id}`)
        dispatch(fetchTourData(urlTour))
        return res.data
    }
)

export const updateTourData = createAsyncThunk(
    "tour/createTourData",
    async ({urlTour, id, updateData},{dispatch}) => {
        const res = await axios.put(`${urlTour}/${id}`,updateData)
        dispatch(fetchTourData(urlTour))
        dispatch(toggleModalAlert())
        return res.data
    }
)

export const createTourData = createAsyncThunk(
    "tour/createTourData",
    async ({ urlTour, tourData }, { dispatch }) => {
        const res = await axios.post(urlTour, tourData)
        dispatch(fetchTourData(urlTour))
        return res.data
    }
)


const tourSlice = createSlice({
    name: "tour",
    initialState,
    reducers: {
        setSelectTourId : (state, action) => {
            state.selectTourId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTourData.pending, (state) => {
            state.isTourLoad = true
        }).addCase(fetchTourData.fulfilled, (state, action) => {
            state.isTourLoad = false,
                state.tours = action.payload
        }).addCase(fetchTourData.rejected, (state, action) => {
            state.isTourLoad = false,
                state.isTourError = action.payload
        })

        builder.addCase(deleteTourData.pending, (state) => {
            state.isTourLoad = true;
        }).addCase(deleteTourData.fulfilled, (state) => {
            state.isTourLoad = false;
        }).addCase(deleteTourData.rejected, (state, action) => {
            state.isTourLoad = false;
        })

        builder.addCase(createTourData.pending, (state) => {
            state.isTourLoad = true;
        }).addCase(createTourData.fulfilled, (state) => {
            state.isTourLoad = false;
        }).addCase(createTourData.rejected, (state, action) => {
            state.isTourLoad = false;
            console.log(action.error.message)
        })
    }
})


export const { setSelectTourId } = tourSlice.actions
export default tourSlice.reducer