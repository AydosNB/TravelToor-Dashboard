import { CgSpinner } from "react-icons/cg";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DestinationCard from '../components/pageComp/DestinationCard'
import ModalAlert from "../components/pageComp/ModalAlert";
import { toggleModalAlert } from "../store/slices/pageActionSlice";
import { deleteDestData} from "../store/slices/destinationSlice";
import CreateDestination from "./CreateDestination";

const Destinations = () => {
  const { destinations, isDestLoad, isDestError, selectDestId } = useSelector(state => state.destination)
  const { tours } = useSelector(state => state.tour)
  const { showModal, modalType } = useSelector(state => state.pageActions)
  const urlDest = "https://travel-data-base.onrender.com/destinations"
  const dispatch = useDispatch()

  async function deleteDestination(id) {
    dispatch(deleteDestData({ urlDest, id, tours }))
    dispatch(toggleModalAlert())
  }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2'>
      {isDestLoad ?
        <div className="font-bold flex justify-center items-center gap-1 text-orange-500 absolute top-0 right-0 bottom-0 left-0">
          <span className="text-[20px] animate-spin">
            <CgSpinner />
          </span>
          <span className="text-[18px]">Loading...</span>
        </div>
        :
        destinations.map(item => (
          <DestinationCard key={item.id} item={item} />
        ))}
      {
        showModal &&
        <ModalAlert title={modalType==="update"? "Update destination" : "Delete destination"}>
          {modalType !== "update" ?
            <div className="mt-[20px]">
              <h2 className="mb-[10px]">Do you want to delete this destination?</h2>
              <div className="flex justify-end items-center gap-1">
                <button onClick={() => dispatch(toggleModalAlert())} className="py-[5px] px-[10px] rounded-md shadow-sm bg-blue-500 text-white hover:bg-blue-600 active:scale-95">
                  Cancel
                </button>
                <button onClick={() => deleteDestination(selectDestId)} className="py-[5px] px-[10px] rounded-md shadow-sm bg-red-500 text-white hover:bg-red-600 active:scale-95">
                  Delete
                </button>
              </div>
            </div>:
            <CreateDestination baseData={destinations.find(item => item.id === selectDestId)}/>}
        </ModalAlert>
      }
    </div>
  )
}

export default Destinations