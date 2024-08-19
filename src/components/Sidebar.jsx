import React from 'react'
import logo from "../images/logos/logo.png"
import { getBtnData } from '../config/constants'
import { Link, useLocation } from 'react-router-dom'
import SideButton from './pageComp/SideButton'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../store/slices/pageActionSlice'
import { useTranslation } from 'react-i18next'

const Sidebar = () => {
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const [t] = useTranslation()
    const btnData = getBtnData(t)
  return (
    <div>
      <div className='flex justify-center items-center gap-2 text-[20px] font-bold text-gray-800 py-[10px]'>
        <img className='w-[30px] h-[30px] object-contain' src={logo} alt="" />
        <span>Travel<span className='text-orange-500'>Toor</span></span>
      </div>
      <hr className='mb-[15px]'/>
      <div className='flex flex-col gap-2'>
        {btnData.map(item => (
            <Link to={item.path} key={item.id} onClick={() => dispatch(toggleSidebar())}>
                <SideButton variant={pathname===item.path? "active" : ""}>
                    {item.icon()}
                    <span className={pathname !== item.path? "text-gray-700" : ""}>{item.title}</span>
                </SideButton>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
