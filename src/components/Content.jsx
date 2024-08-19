import React from 'react'

const Content = ({children}) => {
  return (
    <div className='min-h-[calc(100vh-90px)] bg-gray-100 max-h-[calc(100vh-90px)] overflow-y-auto border-[1px] shadow-md rounded-md mt-[10px] p-[10px] relative'>
      {children}
    </div>
  )
}

export default Content
