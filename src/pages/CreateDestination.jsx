import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useDispatch } from 'react-redux'
import { createDestData, updateDestData } from '../store/slices/destinationSlice'
import { toggleModalAlert } from '../store/slices/pageActionSlice'



const CreateDestination = ({ baseData }) => {
  console.log(baseData)
  const urlDest = "https://travel-data-base.onrender.com/destinations"
  const dispatch = useDispatch()

  const initialValues = baseData ? {
    name: baseData.name,
    image: baseData.image,
    country: baseData.country,
    description: baseData.description,
  }
    :
    {
      name: "",
      image: "",
      country: "",
      description: "",
    }

  const validationSchema = Yup.object({
    name: Yup.string().max(100, "Max character 100").required("Name is required"),
    image: Yup.string().url("Invalid url adress").required("Image is required"),
    country: Yup.string().max(100, "Max character 100").required("Country is required"),
    description: Yup.string().min(100, "Min character 100").max(1000, "Max character 1000").required("Description is required")
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

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          const newValues = { ...values, slug: slug(values.name) }
          {
            baseData ? 
              dispatch(updateDestData({ urlDest, id: baseData.id, updateData: newValues }))
              :
              dispatch(createDestData({urlDest, destData:newValues}))}
      actions.resetForm()
        }}
      validationSchema={validationSchema}
      >
      <Form className='flex flex-col gap-3'>

        <div className='flex flex-col'>
          <label htmlFor="name">Name:</label>
          <Field id="name" className="py-[7px] px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="text" name="name" placeholder="Enter the city name" />
          <span className='text-[14px] text-red-500 font-medium'>
            <ErrorMessage name='name' />
          </span>
        </div>

        <div className='flex flex-col'>
          <label htmlFor="image">Image:</label>
          <Field id="image" className="py-[7px] px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="url" name="image" placeholder="Enter the image url" />
          <span className='text-[14px] text-red-500 font-medium'>
            <ErrorMessage name='image' />
          </span>
        </div>

        <div className='flex flex-col'>
          <label htmlFor="country">Country</label>
          <Field id="country" className="py-[7px] px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="text" name="country" placeholder="Enter the country name" />
          <span className='text-[14px] text-red-500 font-medium'>
            <ErrorMessage name='country' />
          </span>
        </div>

        <div className='flex flex-col'>
          <label htmlFor="description">Description</label>
          <Field as="textarea" id="description" className="py-[7px] resize-none px-[10px] outline-none border-[2px] rounded-sm hover:border-orange-100 focus:border-orange-600" type="text" name="description" placeholder="Enter the description" />
          <span className='text-[14px] text-red-500 font-medium'>
            <ErrorMessage name='description' />
          </span>
        </div>

        <div className='mt-[10px] flex justify-end items-center'>
          <button className='py-[5px] px-[15px] rounded-sm bg-orange-500 hover:bg-orange-600 text-white shadow-sm active:scale-95' type='submit'>
            {baseData ? "Update" : "Send"}
          </button>
        </div>

      </Form>
    </Formik>
    </div >
  )
}

export default CreateDestination
