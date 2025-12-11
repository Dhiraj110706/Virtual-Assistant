import React, { useState, useRef } from 'react'

import image1 from '../assets/image1.png'
import image2 from '../assets/image2.jpg'
import image3 from '../assets/authBg.png'
import image4 from '../assets/image4.png'
import image5 from '../assets/image5.png'
import image6 from '../assets/image6.jpeg'
import image7 from '../assets/image7.jpeg'

import Card from '../components/Card.jsx'
import { LuImagePlus } from 'react-icons/lu'
import { MdKeyboardBackspace } from "react-icons/md";

import { useContext } from 'react'
import { userDataContext } from '../context/userContext.jsx'
import { useNavigate } from 'react-router-dom'

const Customize = () => {
  const Navigate = useNavigate()
  const {
    serverUrl,
    useData,
    setUseData,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage
  } = useContext(userDataContext)
  //  const [frontendImage , setFrontendImage] = useState(null);
  //  const [backendImage , setBackendImage] = useState(null);
  const inputImage = useRef()
  const handleChange = e => {
    const file = e.target.files[0]
    if (!file) return;   // <-- FIX: prevents crash

  const preview = URL.createObjectURL(file);

  setBackendImage(file);
  setFrontendImage(preview);
  setSelectedImage(preview);
    // const reader = new FileReader();
  }
  return (
    <div className='w-full min-h-screen bg-linear-to-t from-black to-[#030353] flex flex-col justify-center items-center py-10'>
      <MdKeyboardBackspace className='absolute top-6 cursor-pointer left-6 text-white w-5 h-5  ' onClick={()=>{Navigate('/')}}/>
      <div className='w-[94%] max-w-6xl'>
        {/* header or instructions (optional) */}
        <h1 className='text-white text-xl md:text-2xl mb-6 text-center'>
          Select your <span className='text-blue-200'>Assistant Image </span>{' '}
        </h1>

        {/* responsive grid: 2 cols on very small, 3 on small, 4 on md, 5 on lg */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center'>
          <Card image={image1} />
          <Card image={image2} />
          <Card image={image3} />
          <Card image={image4} />
          <Card image={image5} />
          <Card image={image6} />
          <Card image={image7} />

          {/* upload card */}
          {/* <div className={`w-36 sm:w-[120px] md:w-[150px] h-56 sm:h-[180px] md:h-[250px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,255,0.25)] cursor-pointer hover:border-4 transition-all duration-300 shadow-lg flex justify-center items-center ${selectedImage == image?"border-4 border-white shadow-2xl shdow-blue-950":null}`} onClick={()=>inputImage.current.click()}> */}
          <div
  className={`
    w-36 sm:w-[120px] md:w-[150px]
    h-56 sm:h-[180px] md:h-[250px]
    rounded-2xl overflow-hidden cursor-pointer shadow-lg
    transition-all duration-300 flex flex-col justify-center items-center
    ${selectedImage === "input"
      ? "border-4 border-white shadow-[0_0_20px_rgba(0,0,255,0.4)] scale-105"
      : "border-2 border-[#0000ff66] hover:scale-105 hover:border-blue-400"
    }
  `}
  onClick={() => {
    inputImage.current.click();
    setSelectedImage("input");
  }}
>
  {!frontendImage && (
    <div className="flex flex-col items-center justify-center gap-2 text-white opacity-80">
      <LuImagePlus className="w-10 h-10 text-white" />
      <p className="text-sm text-center px-2">Upload Your Own Image</p>
    </div>
  )}

  {frontendImage && (
    <img src={frontendImage} className="w-full h-full object-cover" alt="uploaded" />
  )}
</div>


          <input
            type='file'
            className='hidden'
            accept='image'
            ref={inputImage}
            onChange={handleChange}
          />
        </div>
      </div>
    {selectedImage &&   <button
        type='submit'
        className='w-fit px-12 h-12 bg-blue-500 text-white cursor-pointer rounded-full text-lg font-semibold mt-5 hover:bg-blue-600 transition duration-300' onClick={()=>Navigate('/customize2')}
      >
        
        Next
      </button>}
    </div>
  )
}

export default Customize
