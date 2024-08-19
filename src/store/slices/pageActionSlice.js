import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    showSidebar: false,
    showLangCont: false,
    showModal : false,
    selectedLang: "ENG",
    modalType : "update"
}

const pageActionSlice = createSlice({
    name: "pageActions",
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.showSidebar = state.showSidebar ? false : true
        },
        toggleLangCont: (state) => {
            state.showLangCont = state.showLangCont ? false : true
        },
        setSelectLangData: (state, action) => {
            state.selectedLang = action.payload
        },
        toggleModalAlert :(state) => {
            state.showModal = state.showModal? false : true
        },
        setModalType : (state, action) => {
            state.modalType = action.payload
        }
    }
})

export const { toggleSidebar, toggleLangCont, setSelectLangData, toggleModalAlert, setModalType } = pageActionSlice.actions
export default pageActionSlice.reducer