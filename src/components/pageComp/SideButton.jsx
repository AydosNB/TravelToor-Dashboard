import React from 'react'

const SideButton = ({children, variant}) => {
  return (
    <button className={`py-[7px] duration-200 px-[10px] flex justify-start items-center gap-2 text-[16px] font-semibold ${variant === "active"? "bg-orange-500 hover:bg-orange-600 text-white" : "bg-white text-orange-500 hover:bg-gray-50"} active:scale-95 w-full border-[1px] shadow-sm rounded-md`}>
        {children}
    </button>
  )
}

export default SideButton
