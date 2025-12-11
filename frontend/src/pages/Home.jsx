// // import React , {useContext, useEffect, useState } from 'react'
// // import { userDataContext } from '../context/userContext.jsx'
// // import { useNavigate } from 'react-router-dom'
// // import axios from 'axios';
// // import { useRef } from 'react';
// // import { FaGlasses } from 'react-icons/fa';



// // const Home = () => {
// //   const Navigate = useNavigate();
// //   const {userData,serverUrl,setUserData,getGeminiResponse} = useContext(userDataContext)

// //   const [listening , setListening] = useState(false)
// //   const isSpeakingRef = useRef(false)
// //   const recognitionRef = useRef(null)
// //   const synth = window.speechSynthesis

// //   const handleLogout = async()=> {

// //     try {
// //       const result = await axios.get(`${serverUrl}/api/auth/logout`, {
// //         withCredentials: true,
// //       });
// //       setUserData(null);
// //       Navigate('/login');
// //       console.log(result);
// //     } catch (error) { 
// //       setUserData(null);
// //       console.error("Error during logout:", error);
// //       Navigate('/login');
// //     }
    
// //   }
   

// //   const speak = (text) =>{
// //     const utterence = new SpeechSynthesisUtterance(text)
// //     isSpeakingRef.current = true
// //     utterence.onend = () =>{
// //       isSpeakingRef.current = false
// //       recognitionRef.current?.start()

// //     }
    
// //     synth.speak(utterence)

// //   }
  
// //   const handleCommand =(data) =>{
// //     const {type,userInput,response} = data 
// //     speak(data.response);

// //     if(type === 'google_search'){
// //       const query = encodeURIComponent(userInput)

// //       window.open(`https://www.google.com/search?q=${query}` , 
// //         '_blank'
// //       );
// //     }

// //     if(type === 'calculator_open'){
// //        window.open(`https://www.google.com/search?q=calculator` , 
// //         '_blank'
// //       );
// //     }

// //     if(type === 'instagram_open'){
// //        window.open(`https://www.instagram.com/` , 
// //         '_blank'
// //       );
// //     }
// //     if(type === 'facebook_open'){
// //        window.open(`https://www.facebook.com/` , 
// //         '_blank'
// //       );
// //     }
// //     if(type === 'weather_show'){
// //        window.open(`https://www.google.com/search?q=weather` , 
// //         '_blank'
// //       );
// //     }
// //     if (type === "youtube_search" || type === "youtube_play") {

// //   const query = encodeURIComponent(userInput || data.userinput || "");

// //   window.open(
// //     `https://www.youtube.com/results?search_query=${query}`,
// //     "_blank"
// //   );
// // }
     
// //   }


// //   useEffect(()=>{
// //     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

// //     const recognition =  new SpeechRecognition()
// //     recognition.continuous = true
// //     recognition.lang = 'en_US'

// //     recognitionRef.current = recognition 
// //     const isRecognizingRef = {current : false}

// //     const safeRecognition =()=>{
// //       if(!isSpeakingRef.current && !isRecognizingRef.current){
// //         try {
// //           recognition.start()
// //           console.log("Recognition requested to start")
// //         } catch (error) {
// //           if(error.name !=="InvalidStateError"){
// //             console.error("Start error :",error)
// //           }
// //         }
// //       }
// //     }

// //     recognition.onstart = () =>{
// //       console.log("Recognition started")
// //       isRecognizingRef.current = true 
// //       setListening(true)
// //     }

// //     recognition.onend = () =>{
// //       console.log("Recognition Ended")
// //       isRecognizingRef.current = false
// //       setListening(false)
    
// //       if(!isSpeakingRef.current){
// //         setTimeout(()=>{
// //           safeRecognition()
// //         },1000);
// //       }

// //     };


// //     recognition.onerror = (event) =>{
// //       console.warn("Recognintion Error : ",event.error)
// //       isRecognizingRef.current = false 
// //       setListening(false)
// //       if(event.error!=='aborted' && !isSpeakingRef.current){
// //         setTimeout(()=>{
// //           safeRecognition() 
// //         },1000)
// //       }
// //     }

// //     recognition.onresult = async (e) => {
// //       const transcript = e.results[e.results.length - 1 ][0].transcript.trim()
// //       // console.log("heard :"+transcript)

// //       if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
// //         const data = await getGeminiResponse(transcript)
// //         console.log(data)

// //         // speak(data.response)
// //         recognition.stop()
// //         isRecognizingRef.current = false
// //         setListening(false)
// //         handleCommand(data)

// //       }
// //       console.log(e)
// //     }

// //     const fallback = setInterval(()=>{
// //       if(!isSpeakingRef.current&&!isRecognizingRef.current){
// //         safeRecognition()
// //       }
// //     },10000)

// //     safeRecognition()
// //     return ()=>{
// //       recognition.stop()
// //       setListening(false)
// //       isRecognizingRef.current = false
// //       clearInterval(fallback)
// //     }
// //     // recognition.start()
    

// //   },[])


  
// //   return (
// //     <div className='w-full min-h-screen bg-linear-to-t from-black to-[#02023d] flex flex-col justify-center items-center py-10 gap-3'>

// //        <button type="submit" className="min-w-25 h-12 absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300" onClick={handleLogout}>
// //           Log Out
// //         </button>
// //          <button type="submit" className="min-w-25 h-12 absolute top-20  px-4 py-2 right-4 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300" onClick={()=>Navigate('/customize')}>
// //           Customize your Assistant
// //         </button>

// //       <div className='text-white text-3xl mb-5'>Welcome, {userData?.name}!</div>
// //       <div className="w-[300px] h-[400px] mb-5 rounded-3xl overflow-hidden shadow-xl 
// //                 border border-white/20 bg-black/20 backdrop-blur-md">
// //   <img 
// //     src={userData?.assistantImage} 
// //     alt="Assistant"
// //     className="w-full h-full object-cover"
// //   />
// // </div>

// //       <div className='text-white text-center max-w-md px-4 ST'>
// //         I'm {userData?.assistantName}, your personal AI assistant. How can I help you today?
// //       </div>
// //     </div>
// //   )
// // }

// // export default Home
// import React , {useContext, useEffect, useState, useRef } from 'react'
// import { userDataContext } from '../context/userContext.jsx'
// import { useNavigate } from 'react-router-dom'
// import axios from 'axios';
// import ai from "../assets/ai.gif"
// import user from "../assets/user.gif"
// import { CgMenuRight } from "react-icons/cg";
// import { RxCross1 } from "react-icons/rx";


// const Home = () => {
//   const Navigate = useNavigate();
//   const {userData,serverUrl,setUserData,getGeminiResponse} = useContext(userDataContext)

//   const [listening , setListening] = useState(false)

//   const isSpeakingRef = useRef(false)
//   const isRecognizingRef = useRef(false)
//   const recognitionRef = useRef(null)

//   const [userText,setUserText] = useState()
//   const [aiText,setAiText] = useState()

//   const synth = window.speechSynthesis

//   // ----------------- LOGOUT -----------------
//   const handleLogout = async()=> {
//     try {
//       const result = await axios.get(`${serverUrl}/api/auth/logout`, {
//         withCredentials: true,
//       });
//       setUserData(null);
//       Navigate('/login');
//       console.log(result);
//     } catch (error) { 
//       setUserData(null);
//       console.error("Error during logout:", error);
//       Navigate('/login');
//     }
//   }
   
//   // ----------------- SPEAK -----------------
//   const speak = (text) =>{
//     if (!text) return;
//     if (!synth) return;

//     const utterence = new SpeechSynthesisUtterance(text)
//      utterence.lang = 'hi-IN'
//       const voices = window.speechSynthesis.getVoices()
//      const hindiVoice = voices.find(v  => v.lang === "hi-IN")
//      if(hindiVoice){
//       utterence.voice = hindiVoice ;
//      }
//     isSpeakingRef.current = true

   


//     utterence.onend = () =>{
//       setAiText("")
//       isSpeakingRef.current = false
//       // ❌ yahan pe recognitionRef.current?.start() nahi karna
//       // restart safeRecognition + onend se handle hoga
//     }

//     synth.speak(utterence)
//   }
  
//   // ----------------- COMMAND HANDLING -----------------
//   const handleCommand =(data) =>{
//     if (!data) return;

//     const {type,userInput,response} = data 

//     speak(response);

//     if(type === 'google_search'){
//       const query = encodeURIComponent(userInput)
//       window.open(`https://www.google.com/search?q=${query}` , '_blank');
//     }

//     if(type === 'calculator_open'){
//       window.open(`https://www.google.com/search?q=calculator` , '_blank');
//     }

//     if(type === 'instagram_open'){
//       window.open(`https://www.instagram.com/` , '_blank');
//     }

//     if(type === 'facebook_open'){
//       window.open(`https://www.facebook.com/` , '_blank');
//     }

//     if(type === 'weather_show'){
//       window.open(`https://www.google.com/search?q=weather` , '_blank');
//     }

//     if (type === "youtube_search" || type === "youtube_play") {
//       const query = encodeURIComponent(userInput || data.userinput || "");
//       window.open(
//         `https://www.youtube.com/results?search_query=${query}`,
//         "_blank"
//       );
//     }
//   }

//   // ----------------- SPEECH RECOGNITION -----------------
//   useEffect(()=>{

//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (!SpeechRecognition) {
//       console.error("SpeechRecognition not supported in this browser.");
//       return;
//     }

//     const recognition =  new SpeechRecognition()

//     recognition.continuous = true
//     recognition.lang = 'en_US'

//     recognitionRef.current = recognition

//     // Safe Start
//     const safeRecognition =()=>{
//       if(!isSpeakingRef.current && !isRecognizingRef.current){
//         try {
//           recognition.start()
//           console.log("Recognition requested to start")
//         } catch (error) {
//           if(error.name !=="InvalidStateError"){
//             console.error("Start error :",error)
//           }
//         }
//       }
//     }

//     // onstart
//     recognition.onstart = () =>{
//       console.log("Recognition started")
//       isRecognizingRef.current = true 
//       setListening(true)
//     }

//     // onend
//     recognition.onend = () =>{
//       console.log("Recognition Ended")
//       isRecognizingRef.current = false
//       setListening(false)

//       if(!isSpeakingRef.current){
//         setTimeout(()=>{ safeRecognition() },1000)
//       }
//     }

//     // onerror
//     recognition.onerror = (event) =>{
//       if (event.error !== "aborted") {
//         console.warn("Recognition Error :", event.error)
//       }

//       isRecognizingRef.current = false 
//       setListening(false)

//       if(event.error!=='aborted' && !isSpeakingRef.current){
//         setTimeout(()=>{ safeRecognition() },1000)
//       }
//     }

//     // onresult
//     recognition.onresult = async (e) => {
//       const transcript = e.results[e.results.length - 1 ][0].transcript.trim()
//       console.log(transcript)

//       if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
//         setAiText("")
//         setUserText(transcript)
//         const data = await getGeminiResponse(transcript)
//         console.log(data)


//         recognition.stop()                     // stop before speaking
//         isRecognizingRef.current = false
//         setListening(false)

//         handleCommand(data)
//         setAiText(data.response)
//         setUserText("")
//       }
//     }

//     // fallback loop
//     const fallback = setInterval(()=>{
//       if(!isSpeakingRef.current && !isRecognizingRef.current){
//         safeRecognition()
//       }
//     },10000)

//     safeRecognition()

//     return ()=>{
//       recognition.stop()
//       setListening(false)
//       isRecognizingRef.current = false
//       clearInterval(fallback)
//     }

//   },[])

//   // ----------------- UI -----------------
//   return (
//     <div className='w-full min-h-screen bg-linear-to-t from-black to-[#02023d] flex flex-col justify-center items-center py-10 gap-3'>

//       <CgMenuRight className='lg:hidden  text-white absolute top-4 right-4 w-5 h-5'/>
//       <div className="absolute top-0 w-full h-full bg-[#00000053] backdrop-blur-lg flex flex-col gap-4 justify-start items-start" >
//       <RxCross1 className=  '  text-white absolute top-4 right-4 w-5 h-5 p-4'/>
//       <button
//         type="submit"
//         className="min-w-25 h-12   px-4 py-2 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300"
//         onClick={handleLogout}
//        >
//           Log Out
//        </button>

//        <button
//         type="submit"
//         className="min-w-25 h-12   px-4 py-2  bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300 " 
//         onClick={()=>Navigate('/customize')}
//        >
//           Customize your Assistant
//        </button>
//       </div>
       

//       <div className='text-white text-3xl mb-5'>Welcome, {userData?.name}!</div>

//       <div className="w-[300px] h-[400px] mb-5 rounded-3xl overflow-hidden shadow-xl border border-white/20 bg-black/20 backdrop-blur-md">
//         <img src={userData?.assistantImage} alt="Assistant" className="w-full h-full object-cover" />
//       </div>

//       {
//         !aiText && <img src = {user} className='w-[200px]'/>
//       }
      
//       {
//         aiText && <img src = {ai} className='w-[200px]'/>
//       }
      
//       <h1 className='text-white'>{userText ? userText : aiText ? aiText : null}</h1>

//       {/* <div className='text-white text-center max-w-md px-4 ST'>
//         I'm {userData?.assistantName}, your personal AI assistant. How can I help you today?
//       </div> */}
//     </div>
//   )
// }

// export default Home
import React , {useContext, useEffect, useState, useRef } from 'react'
import { userDataContext } from '../context/userContext.jsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import ai from "../assets/ai.gif"
import user from "../assets/user.gif"
import { CgMenuRight } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";

const Home = () => {
  const Navigate = useNavigate();
  const {userData,serverUrl,setUserData,getGeminiResponse} = useContext(userDataContext)

  const [listening , setListening] = useState(false)

  const isSpeakingRef = useRef(false)
  const isRecognizingRef = useRef(false)
  const recognitionRef = useRef(null)

  const [userText,setUserText] = useState()
  const [aiText,setAiText] = useState()

  const [menuOpen, setMenuOpen] = useState(false) // mobile menu toggle

  const synth = window.speechSynthesis

  // LOGOUT
  const handleLogout = async()=> {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      Navigate('/login');
      console.log(result);
    } catch (error) { 
      setUserData(null);
      console.error("Error during logout:", error);
      Navigate('/login');
    }
  }

  // SPEAK
  const speak = (text) =>{
    if (!text) return;
    if (!synth) return;

    const utterence = new SpeechSynthesisUtterance(text)
    utterence.lang = 'hi-IN'
    const voices = window.speechSynthesis.getVoices()
    const hindiVoice = voices.find(v  => v.lang === "hi-IN")
    if(hindiVoice) utterence.voice = hindiVoice ;
    isSpeakingRef.current = true

    utterence.onend = () =>{
      setAiText("")
      isSpeakingRef.current = false
    }

    synth.speak(utterence)
  }

  // COMMAND HANDLING
  const handleCommand =(data) =>{
    if (!data) return;
    const {type,userInput,response} = data 
    speak(response);

    if(type === 'google_search'){
      const query = encodeURIComponent(userInput)
      window.open(`https://www.google.com/search?q=${query}` , '_blank');
    }

    if(type === 'calculator_open'){
      window.open(`https://www.google.com/search?q=calculator` , '_blank');
    }

    if(type === 'instagram_open'){
      window.open(`https://www.instagram.com/` , '_blank');
    }

    if(type === 'facebook_open'){
      window.open(`https://www.facebook.com/` , '_blank');
    }

    if(type === 'weather_show'){
      window.open(`https://www.google.com/search?q=weather` , '_blank');
    }

    if (type === "youtube_search" || type === "youtube_play") {
      const query = encodeURIComponent(userInput || data.userinput || "");
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank"
      );
    }
  }

  // SPEECH RECOGNITION
  useEffect(()=>{

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error("SpeechRecognition not supported in this browser.");
      return;
    }

    const recognition =  new SpeechRecognition()
    recognition.continuous = true
    recognition.lang = 'en_US'
    recognitionRef.current = recognition

    // Safe Start
    const safeRecognition =()=> {
      if(!isSpeakingRef.current && !isRecognizingRef.current){
        try {
          recognition.start()
          console.log("Recognition requested to start")
        } catch (error) {
          if(error.name !=="InvalidStateError"){
            console.error("Start error :",error)
          }
        }
      }
    }

    recognition.onstart = () =>{
      console.log("Recognition started")
      isRecognizingRef.current = true 
      setListening(true)
    }

    recognition.onend = () =>{
      console.log("Recognition Ended")
      isRecognizingRef.current = false
      setListening(false)
      if(!isSpeakingRef.current){
        setTimeout(()=>{ safeRecognition() },1000)
      }
    }

    recognition.onerror = (event) =>{
      if (event.error !== "aborted") {
        console.warn("Recognition Error :", event.error)
      }
      isRecognizingRef.current = false 
      setListening(false)
      if(event.error!=='aborted' && !isSpeakingRef.current){
        setTimeout(()=>{ safeRecognition() },1000)
      }
    }

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1 ][0].transcript.trim()
      console.log("heard:", transcript)

      if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
        setAiText("")
        setUserText(transcript)
        const data = await getGeminiResponse(transcript)
        console.log(data)

        recognition.stop()                     // stop before speaking
        isRecognizingRef.current = false
        setListening(false)

        handleCommand(data)
        setAiText(data.response)
        setUserText("")
      }
    }

    // fallback loop
    const fallback = setInterval(()=> {
      if(!isSpeakingRef.current && !isRecognizingRef.current){
        safeRecognition()
      }
    },10000)

    safeRecognition()

    return ()=> {
      try { recognition.stop() } catch {}
      setListening(false)
      isRecognizingRef.current = false
      clearInterval(fallback)
    }

  },[getGeminiResponse, userData?.assistantName]) // small deps

  // UI
  return (
    <div className='w-full min-h-screen bg-linear-to-t from-black to-[#02023d] flex flex-col items-center py-8 gap-6 relative'>
      
      {/* Header */}
      <header className="w-full max-w-5xl px-6 flex items-center justify-between mt-4 z-20">
        <div className="flex items-center gap-3">
          <div className="text-white text-xl font-semibold">Hi, {userData?.name}</div>
          {/* listening indicator */}
          <div className="ml-2">
            <span className={`inline-block w-3 h-3 rounded-full ${listening ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} title={listening ? 'Listening' : 'Idle'} />
          </div>
        </div>

        {/* desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={()=>Navigate('/customize')}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition"
            aria-label="Customize assistant"
          >
            Customize
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition"
            aria-label="Log out"
          >
            Log Out
          </button>
        </div>

        {/* mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Open menu"
            className="p-2 rounded-md bg-white/6 hover:bg-white/10 text-white"
          >
            {menuOpen ? <RxCross1 className='w-6 h-6'/> : <CgMenuRight className='w-6 h-6'/>}
          </button>
        </div>
      </header>

      {/* mobile menu */}
      {menuOpen && (
        <div className="lg:hidden w-full px-6 z-20">
          <div className="flex flex-col gap-2 items-end">
            <button
              onClick={()=> { setMenuOpen(false); Navigate('/customize')}}
              className="w-40 text-right px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition"
            >
              Customize
            </button>
            <button
              onClick={()=> { setMenuOpen(false); handleLogout()}}
              className="w-40 text-right px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-medium transition"
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Main card */}
      <main className='w-full max-w-5xl flex flex-col items-center gap-6 px-6 z-10'>
        <div className="w-[300px] h-[400px] rounded-3xl overflow-hidden shadow-xl border border-white/20 bg-black/20 backdrop-blur-md">
          <img src={userData?.assistantImage} alt="Assistant" className="w-full h-full object-cover" />
        </div>

        {/* animated icon */}
        <div className="h-48 flex items-center justify-center">
          {!aiText && <img src={user} className='w-[200px] animate-fadeIn' alt="user" />}
          {aiText && <img src={ai} className='w-[200px] animate-fadeIn' alt="ai" />}
        </div>

        <h1 className='text-white text-center max-w-lg min-h-8 px-4'>
          {userText ? userText : aiText ? aiText : `I'm ${userData?.assistantName}, your personal AI assistant.`}
        </h1>
      </main>

    </div>
  )
}

export default Home
