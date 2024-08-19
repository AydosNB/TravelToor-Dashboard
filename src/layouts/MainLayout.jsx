import { IoIosArrowForward } from "react-icons/io"; 
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDestData } from '../store/slices/destinationSlice'
import { fetchTourData } from '../store/slices/tourSlice'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Content from '../components/Content'
import { toggleSidebar } from "../store/slices/pageActionSlice";
import { fetchUserData } from "../store/slices/userSlice";
const MainLayout = () => {
    const { destinations, isDestLoad, isDestError } = useSelector(state => state.destination)
    const { tours, isTourLoad, isTourError } = useSelector(state => state.tour)
    const {users} = useSelector(state => state.user)
    const { showSidebar } = useSelector(state => state.pageActions)
    const dispatch = useDispatch()

    const urlDest = "https://travel-data-base.onrender.com/destinations"
    const urlTour = "https://travel-data-base.onrender.com/offers"
    const urlUsers = "https://travel-data-base.onrender.com/users"

    useEffect(() => {
        dispatch(fetchDestData(urlDest))
        dispatch(fetchTourData(urlTour))
        dispatch(fetchUserData(urlUsers))
    }, [])

    console.log(users)

    return (
        <div className='w-full h-[100vh] p-[10px] font-ubuntu'>
            <div className='rounded-md shadow-sm h-full flex justify-between gap-[10px]'>
                <div className={`min-w-[250px] z-10 duration-300 border-[1px] bg-white top-[10px] bottom-[10px] ${showSidebar? "left-[10px]" : "left-[-250px]"} shadow-md p-[10px] rounded-md absolute sm:static`}>
                    <Sidebar />
                    <button onClick={() => dispatch(toggleSidebar())} className="w-[30px] h-[40px] bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-[20px] flex sm:hidden justify-center items-center absolute right-[-32px] rounded-md">
                        <div className={`${showSidebar? "rotate-180" : "rotate-0"} duration-400`}>
                            <IoIosArrowForward />
                        </div>
                    </button>
                </div>
                <div className='flex-1'>
                    <Header />
                    <Content>
                        <Outlet />
                    </Content>
                </div>
            </div>
        </div>
    )
}

export default MainLayout
