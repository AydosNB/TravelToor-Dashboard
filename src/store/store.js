import { configureStore } from "@reduxjs/toolkit";
import destinationSlice from "./slices/destinationSlice";
import tourSlice from "./slices/tourSlice";
import pageActionSlice from "./slices/pageActionSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
    reducer : {
        destination : destinationSlice,
        tour : tourSlice,
        user : userSlice,
        pageActions : pageActionSlice
    }
})