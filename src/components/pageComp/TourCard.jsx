import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import { useInView } from 'react-intersection-observer'
import { setModalType, toggleModalAlert } from '../../store/slices/pageActionSlice'
import { setSelectTourId } from '../../store/slices/tourSlice'
import { useDispatch } from 'react-redux'

const TourCard = ({ item, loading }) => {
    const dispatch = useDispatch()

    function setTourId(id, type) {
        dispatch(setModalType(type))
        dispatch(toggleModalAlert())
        dispatch(setSelectTourId(id))
    }
    
    const {ref, inView} = useInView({
        threshold : 0.2,
        triggerOnce: true
    })


    return (
        <div ref={ref} className={`${inView? "opacity-100 top-0" : "opacity-0 top-[30px]"} duration-500 relative p-[15px] group hover:border-orange-600 rounded-md bg-white shadow-sm border-[1px] flex flex-col gap-2`}>
            <div className='border-[1px] rounded-md overflow-hidden'>
                <img className='h-[250px] group-hover:scale-125 duration-300 w-full object-cover' src={item?.images[0]} alt="" />
            </div>
            <div>
                <h1 className='text-[20px] font-bold mb-[10px]'>{item.title}</h1>
                <p className='max-h-[70px] min-h-[70px] p-[5px] border-[1px] rounded-sm overflow-y-auto text-[14px]'>
                    {item.details}
                </p>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex justify-start items-center gap-2 text-[16px] font-bold'>
                    <span className='text-gray-700'>rate:</span>
                    <span className='p-[3px] bg-orange-500 text-white rounded-sm shadow-sm text-[16px] px-[5px] leading-[20px]'>{item.rating}</span>
                </div>
                <div className='flex justify-end items-center gap-2 text-[16px] font-bold'>
                    <span className='text-gray-700'>price:</span>
                    <span className='text-orange-500'>{item.price}</span>
                </div>
            </div>
            <hr className='mt-[10px] mb-[5px]'/>
            <div className="flex justify-end items-center gap-1">
                <button onClick={() => setTourId(item.id, "update")} className="py-[3px] px-[10px] flex justify-start items-center rounded-md hover:bg-gray-200 text-[16px] font-semibold border-[1px] active:scale-95 text-blue-600">
                    <AiOutlineEdit />
                    <span>Edit</span>
                </button>
                <button onClick={() => setTourId(item.id, "delete")} className="py-[3px] px-[10px] flex justify-start items-center rounded-md hover:bg-gray-200 text-[16px] font-semibold border-[1px] active:scale-95 text-red-600">
                    <HiOutlineTrash />
                    <span>Delete</span>
                </button>
            </div>
        </div>
    )
}

export default TourCard
