import 'boxicons'
import React, { useEffect, useRef, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { createTourData, updateTourData } from '../store/slices/tourSlice'

const CreateTour = ({ baseData }) => {
  const urlTour = "https://travel-data-base.onrender.com/offers"
  const dispatch = useDispatch()
  const { destinations, isDestLoad, isDestError } = useSelector(state => state.destination)

  const initialValues = baseData ?
    {
      title: baseData.title,
      details: baseData.details,
      images: baseData.images,
      rating: baseData.rating,
      price: baseData.price,
      destinationId: baseData.destinationId
    } :
    {
      title: "",
      details: "",
      images: "",
      rating: "",
      price: "",
      destinationId: ""
    }

  const validationSchema = Yup.object({
    title: Yup.string().max(100, "Max character 100").required("Title is required"),
    details: Yup.string().min(100, "Min character 100").max(1000, "Max character 1000").required("Description is required"),
    // image: Yup.string().url("Invalid url adress").required("Image is required"),
    rating: Yup.number().required("Rating is required"),
    price: Yup.number().required("Price is required"),
    destinationId: Yup.number().required("Dest id is required"),
  })

  const slug = function (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to = "aaaaaeeeeeiiiiooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  };

  const imagesInput = useRef(null)
  const [images, setImages] = useState(baseData ? baseData.images : [])
  const imagesContent = useRef()

  function saveImageUrl(element) {
    const value = element.current.value

    if (value.length > 0) {
      if (!images.find(item => item === value)) {
        setImages(prev => {
          const finalValue = [...prev, value]
          return finalValue
        })
        element.current.value = ""
      }
    }
  }

  useEffect(() => {
    imagesContent.current.innerHTML = ""
    images.forEach((url, index) => {
      imagesContent.current.innerHTML +=
        `<div class="p-[2px] flex justify-center text-[14px] mb-[2px] pl-[5px] items-center rounded-md bg-gray-200 hover:bg-gray-300 border-[1px]">
          <span>image-${index + 1}</span>
          <span data-url = ${url} class="bx-close text-[12px] active:scale-95 cursor-pointer flex justify-center items-center">
          <box-icon name='x'></box-icon>
          </span>
      </div>`
    }
  )
  const bxCloseBtns = document.querySelectorAll(".bx-close")
  bxCloseBtns.forEach(btnClose => {
    btnClose.addEventListener("click", () => {
      const url = btnClose.dataset.url
      setImages(prev => prev.filter(item => item !== url))
    })
  })
  }, [images.length])





  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          values.images = images
          const newValues = { ...values, slug: slug(values.title) }
          { baseData ? dispatch(updateTourData({ urlTour, id: baseData.id, updateData: newValues })) : dispatch(createTourData({ urlTour, tourData: newValues })) }
          setImages([])
          actions.resetForm()
          saveImageUrl(imagesInput)

        }}
        validationSchema={validationSchema}
        validate={() => {
          const errors = {};
          if (images.length < 3) {
            errors.images = "Min image 3"
          }
          return errors;
        }}
      >
        <Form className='flex flex-col gap-3'>

          <div className='flex flex-col'>
            <label htmlFor="title">Title:</label>
            <Field id="title" className="py-[7px] px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="text" name="title" placeholder="Enter the tour name" />
            <span className='text-[14px] text-red-500 font-medium'>
              <ErrorMessage name='title' />
            </span>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="details">Details</label>
            <Field as="textarea" id="details" className="py-[7px] resize-none px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="text" name="details" placeholder="Enter the details" />
            <span className='text-[14px] text-red-500 font-medium'>
              <ErrorMessage name='details' />
            </span>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="images">
              <span>Images:</span>
              <div ref={imagesContent} className='flex justify-start items-center gap-1'>

              </div>
            </label>
            <div className='relative'>
              <Field name="images">
                {(field) => (
                  <input {...field} ref={imagesInput} id="images" className="py-[7px] w-full px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="url" placeholder="Enter the image urls" />
                )}
              </Field>
              <div className='absolute top-0 right-0 bottom-0 p-[5px]'>
                <button onClick={() => saveImageUrl(imagesInput)} type="button" className='h-full px-[15px] bg-gray-100 active:scale-95 hover:bg-gray-200'>
                  Save
                </button>
              </div>
            </div>
            <span className='text-[14px] text-red-500 font-medium'>
              <ErrorMessage name='images' />
            </span>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="rating">Rating</label>
            <Field id="rating" className="py-[7px] px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="number" name="rating" placeholder="Enter the rating count" />
            <span className='text-[14px] text-red-500 font-medium'>
              <ErrorMessage name='rating' />
            </span>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="price">Price</label>
            <Field id="price" className="py-[7px] px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="number" name="price" placeholder="Enter the price count" />
            <span className='text-[14px] text-red-500 font-medium'>
              <ErrorMessage name='price' />
            </span>
          </div>

          <div className='flex flex-col'>
            <label htmlFor="destinationId">Destination</label>
            <Field as="select" id="destinationId" className="py-[7px] px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="text" name="destinationId" placeholder="Enter the price count">
              <option>Select destination</option>
              {destinations.map(item => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </Field>
            <span className='text-[14px] text-red-500 font-medium'>
              <ErrorMessage name="destinationId" />
            </span>
          </div>





          <div className='mt-[10px] flex justify-end items-center'>
            <button type="submit" className='py-[5px] px-[15px] rounded-sm bg-orange-500 hover:bg-orange-600 text-white shadow-sm active:scale-95'>
              {baseData ? "Update" : "Send"}
            </button>
          </div>

        </Form>
      </Formik>
    </div>
  )
}

export default CreateTour
