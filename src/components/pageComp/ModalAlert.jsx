import { CgClose } from "react-icons/cg"; 
import React from 'react'
import { useDispatch } from "react-redux";
import { toggleModalAlert } from "../../store/slices/pageActionSlice";

const ModalAlert = ({ children, title }) => {
    const dispatch = useDispatch()
    return (
        <div className='fixed z-20 top-0 left-0 right-0 bottom-0 bg-black backdrop-blur-[2px] bg-opacity-25 flex justify-center items-start pt-[10vh] pb-[20px] overflow-y-auto'>
            <div className='p-[10px] rounded-md shadow-md bg-white w-[500px] mx-[10px]'>
                <div className="flex justify-between items-center">
                    <span className="text-[18px] font-semibold">{title}</span>
                    <button onClick={() => dispatch(toggleModalAlert())} className="p-[5px] rounded-md hover:bg-gray-100 active:scale-95">
                        <CgClose />
                    </button>
                </div>
                <div className="mt-[20px]">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default ModalAlert
