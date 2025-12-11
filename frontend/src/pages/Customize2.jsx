
import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
// import UserContext from '../context/userContext';
import { userDataContext } from '../context/UserContext.jsx';
import axios from 'axios';
import { MdKeyboardBackspace } from "react-icons/md";




const Customize2 = () => {

    
    const Navigate = useNavigate();
    const {serverUrl , userData , backendImage , selectedImage , setUserData } = useContext(userDataContext);
    const [assistantName , setAssistantName] = useState(userData?.assistantName || "");

    const handleUpdateAssistant = async () => {
        try {
            let formData = new FormData();
            formData.append("assistantName" , assistantName);
            if(backendImage){
                formData.append("assistantImage" , backendImage);
            }
            else{
                formData.append("assistantImageUrl" , selectedImage);
            }

            const result  =  await axios.post(`${serverUrl}/api/user/update-assistant`, formData, {
  withCredentials: true
});

            console.log(result.data);
            setUserData(result.data.user);

        } catch (error) {
            console.error("Error updating assistant:", error);
        }
    }


  return (
    <div className='w-full min-h-screen bg-linear-to-t from-black to-[#030353] flex flex-col justify-center items-center py-10'>
        <MdKeyboardBackspace className='absolute top-6 cursor-pointer left-6 text-white w-5 h-5  ' onClick={()=>{Navigate('/customize')}}/>

        <h1 className='text-white text-xl md:text-2xl mb-6 text-center'>Enter Your <span className='text-blue-200'>Assistant Name</span></h1>
      
        <input type="text" placeholder="eg: sifra , jarvis ," className="w-full max-w-120 h-12 rounded-full px-4 py-2 text-white border-2 border-white bg-transparent placeholder-gray-300 text-lg focus:outline-none " required  onChange={(e)=>setAssistantName(
            e.target.value
        )} value={assistantName}/>

        {assistantName && <button
        type='submit'
        className='w-fit px-12 h-12 bg-blue-500 text-white cursor-pointer rounded-full text-lg font-semibold mt-5 hover:bg-blue-600 transition duration-300' onClick={()=>{Navigate('/'); handleUpdateAssistant()}}
      >
        
        Create Your Assistatnt
      </button>}

    </div>
  )
}

export default Customize2
