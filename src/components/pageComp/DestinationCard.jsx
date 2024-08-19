import { HiOutlineTrash } from "react-icons/hi"; 
import { AiOutlineEdit } from "react-icons/ai"; 
import React from 'react'
import { useDispatch } from "react-redux";
import { setModalType, toggleModalAlert } from "../../store/slices/pageActionSlice";
import { setSelectDestId } from "../../store/slices/destinationSlice";
import { useInView } from "react-intersection-observer";

const DestinationCard = ({ item, loading }) => {
    const dispatch = useDispatch()

    function setDestId(id, type) {
        dispatch(toggleModalAlert())
        dispatch(setSelectDestId(id))
        dispatch(setModalType(type))
    }

    const {ref, inView} = useInView({
        threshold : 0.2,
        triggerOnce: true
    })
    
    return (
        <div ref={ref} className={`${inView? "opacity-100 top-0" : "opacity-0 top-[30px]"} duration-500 p-[15px] relative rounded-md bg-white border-[1px] shadow-sm flex flex-col gap-1 cursor-pointer group hover:border-orange-600`}>
            <div className="border-[1px] rounded-md shadow-sm overflow-hidden relative">
                <img className='h-[220px] duration-300 object-cover w-full group-hover:scale-125' src={item.image} alt="" />
                <div className=' absolute top-2 right-2 rounded-md bg-opacity-80 backdrop-blur-[2px] py-[3px] px-[10px] bg-orange-500 text-white font-semibold text-[12px]'>
                    {item.country}
                </div>
            </div>
            <div>
                <h1 className='text-[18px] text-gray-800 font-bold mb-[10px]'>{item.name}</h1>
                <p className='text-[14px] text-gray-600 font-semibold max-h-[60px] min-h-[60px] border-[1px] p-[3px] rounded-sm overflow-y-auto'>{item.description}</p>
            </div>
            <hr className="mt-[10px] mb-[5px]"/>
            <div className="flex justify-end items-center gap-1">
                <button onClick={() => setDestId(item.id, "update")} className="py-[3px] px-[10px] flex justify-start items-center rounded-md hover:bg-gray-200 text-[16px] font-semibold border-[1px] active:scale-95 text-blue-600">
                    <AiOutlineEdit />
                    <span>Edit</span>
                </button>
                <button onClick={() => setDestId(item.id, "delete")} className="py-[3px] px-[10px] flex justify-start items-center rounded-md hover:bg-gray-200 text-[16px] font-semibold border-[1px] active:scale-95 text-red-600">
                    <HiOutlineTrash />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    )
}

export default DestinationCard
