import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getBtnData, langData } from '../config/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectLangData, toggleLangCont } from '../store/slices/pageActionSlice'
import { useTranslation } from 'react-i18next'

const Header = () => {
    const { pathname } = useLocation()
    

    const { showLangCont, selectedLang } = useSelector(state => state.pageActions)
    const dispatch = useDispatch()
    const { i18n, t } = useTranslation()
    const btnData = getBtnData(t)

    const headerData = btnData.find(item => item.path === pathname)

    function hanndleLangData(lang) {
        dispatch(setSelectLangData(lang))
        dispatch(toggleLangCont())
        switch (lang) {
            case "ENG": {
                i18n.changeLanguage("eng")
                break
            }
            case "RUS": {
                i18n.changeLanguage("rus")
                break
            }
            case "QAR": {
                i18n.changeLanguage("qar")
                break
            }
            default: {
                i18n.changeLanguage("eng")
            }
        }
    }

    const selectBtnData = langData.find(item => item.title === selectedLang)



    return (
        <div className='border-[1px] p-[10px] rounded-md shadow-md h-[60px] flex justify-between items-center'>
            <div className='flex justify-center items-center gap-2'>
                <div className='w-[35px] h-[35px] bg-orange-600 text-white flex justify-center items-center text-[20px] rounded-md'>
                    {headerData.icon()}
                </div>
                <span className='text-[18px] text-gray-800 font-semibold'>
                    {headerData.title}
                </span>
            </div>
            <div className='relative z-[5]'>
                <button onClick={() => hanndleLangData(selectBtnData.title)} className='flex py-[5px] rounded-md px-[10px] justify-center items-center gap-1 border-[1px] hover:bg-gray-100 active:scale-95'>
                    <img className='w-[20px] h-[20px] object-contain' src={selectBtnData.image} alt="" />
                    <span className='text-[16px] font-bold text-gray-800'>{selectBtnData.title}</span>
                </button>
                <div className={`absolute w-[100px] bottom-0 translate-y-[102%] translate-x-[-10%] rounded-sm left-0 p-[5px] border-[1px] shadow-sm bg-white ${showLangCont ? "flex" : "hidden"} flex-col gap-1`}>
                    {langData.map(item => (
                        <button key={item.id} onClick={() => hanndleLangData(item.title)} className='flex py-[5px] px-[10px] justify-center items-center gap-1 hover:bg-gray-100 active:scale-95'>
                            <img className='w-[20px] h-[20px] object-contain' src={item.image} alt="" />
                            <span className='text-[16px] font-bold text-gray-800'>{item.title}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Header
