import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TourCard from '../components/pageComp/TourCard'
import { CgSpinner } from 'react-icons/cg'
import { deleteTourData } from '../store/slices/tourSlice'
import { toggleModalAlert } from '../store/slices/pageActionSlice'
import ModalAlert from '../components/pageComp/ModalAlert'
import CreateTour from './CreateTour'

const Tours = () => {
  const { tours, isTourLoad, isTourError, selectTourId } = useSelector(state => state.tour)
  const { showModal, modalType } = useSelector(state => state.pageActions)
  const urlTour = "https://travel-data-base.onrender.com/offers"
  const dispatch = useDispatch()

  async function deleteTour(id) {
    dispatch(deleteTourData({ urlTour, id }))
    dispatch(toggleModalAlert())
  }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2'>
      {isTourLoad ?
        <div className="font-bold flex justify-center items-center gap-1 text-orange-500 absolute top-0 right-0 bottom-0 left-0">
          <span className="text-[20px] animate-spin">
            <CgSpinner />
          </span>
          <span className="text-[18px]">Loading...</span>
        </div>
        :
        tours.map(item => (
          <TourCard key={item.id} item={item} />
        ))
      }
      {
        showModal &&
        <ModalAlert title={"Delete tour"}>
          {modalType === "update" ?
            <CreateTour baseData={tours.find(item => item.id === selectTourId)}/>
            :
            <div className="mt-[20px]">
              <h2 className="mb-[10px]">Do you want to delete this destination?</h2>
              <div className="flex justify-end items-center gap-1">
                <button onClick={() => dispatch(toggleModalAlert())} className="py-[5px] px-[10px] rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600 active:scale-95">
                  Cancel
                </button>
                <button onClick={() => deleteTour(selectTourId)} className="py-[5px] px-[10px] rounded-md shadow-sm bg-red-500 text-white hover:bg-red-600 active:scale-95">
                  Delete
                </button>
              </div>
            </div>}
        </ModalAlert>
      }
    </div>
  )
}

export default Tours
