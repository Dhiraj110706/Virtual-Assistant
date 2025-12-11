


import React, { useState , useContext } from "react";
import bg from "../assets/authBg.png";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext.jsx";



function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {serverUrl,userData,setUserData} = useContext(userDataContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignUp = async (e)=> {
    e.preventDefault();
    setErrorMessage("");

    try {

        let result = await axios.post(`${serverUrl}/api/auth/signup`,{name,email,password},{withCredentials:true});
        console.log(result.data.user);
        setUserData(result.data.user);
        setLoading(false);
        navigate("/customize");
        
    } catch (error) {
        console.error("Error during sign-up:", error);
        setErrorMessage(error.response.data.message || "An error occurred during sign-up.");
    }
    // Add your sign-up logic here (e.g., form validation, API calls)

  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="w-[92%] max-w-[500px] bg-[#00000060] backdrop-blur-lg rounded-lg p-6 md:p-8
                       flex flex-col gap-4
                       shadow-lg min-h-fit md:min-h-[600px] md:justify-center"  onSubmit={handleSignUp}
            /* avoid fixed heights; let content define height */
      >
        <h1 className="text-white text-2xl md:text-3xl font-semibold mb-2">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        <input type="text" placeholder="Enter username" className="w-full h-12 rounded-full px-4 py-2 text-white border-2 border-white bg-transparent placeholder-gray-300 text-lg focus:outline-none" required onChange={(e)=>setName(e.target.value)} value={name}/>

        <input type="email" placeholder="Enter email" className="w-full h-12 rounded-full px-4 py-2 text-white border-2 border-white bg-transparent placeholder-gray-300 text-lg focus:outline-none" required onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <div className="w-full h-12 border-2 border-white bg-transparent text-white rounded-full relative flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="w-full h-full rounded-full px-4 py-2 bg-transparent placeholder-gray-300 text-lg focus:outline-none"
            required onChange={(e) => setPassword(e.target.value)} value={password}
          />
          {showPassword ? (
            <FaRegEyeSlash size={20} className="absolute right-4 cursor-pointer" onClick={() => setShowPassword(false)} />
          ) : (
            <FaRegEye size={20} className="absolute right-4 cursor-pointer" onClick={() => setShowPassword(true)} />
          )}
        </div>

        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

        <button type="submit" className="min-w-5 h-12 bg-blue-500 text-white rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300">
          Sign Up
        </button>


        <p className="text-white text-4.5 cursor-pointer  text-center" onClick={()=>navigate("/login")}>Already have an account ? <span className="text-blue-500">Sign In</span> </p>
      </form>
    </div>
  );
}


export default SignUp;
