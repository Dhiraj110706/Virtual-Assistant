// import React, { createContext  , useState} from 'react'
// import axios from 'axios';
// import { useEffect } from 'react';

// export const userDataContext = createContext();
// const UserContext = ({children}) => {
//     const serverUrl = "http://localhost:8000";

//     const [userData, setUserData] = useState(null);

//     const handleCurrentUser = async () => {
//         try {
//           const result = await axios.get(`${serverUrl}/api/user/current`, {
//             withCredentials: true, // Include cookies
//           });
//           if (result.data.success) {
//             setUserData(result.data.user);
//           }
//         } catch (error) {
//           console.error("Error fetching current user:", error);

//         }
//     }

//     useEffect(() => {
//         handleCurrentUser();
//     }, []);

//     const value = {serverUrl,userData, setUserData, handleCurrentUser};
//   return (
//     <div>
//         <userDataContext.Provider value={value}>
//       {children}
//       </userDataContext.Provider>

//     </div>
//   )
// }

// export default UserContext
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the Context
export const userDataContext = createContext();

// 2. Define the Provider Component
const UserContext = ({ children }) => {
    // Define the server URL
    const serverUrl = "http://localhost:8000";

    // State to hold the current user data
    const [userData, setUserData] = useState(null);
    // State to track loading status (optional but good practice)
    const [loading, setLoading] = useState(false);

    const [frontendImage , setFrontendImage] = useState();
    const [backendImage , setBackendImage] = useState();
    const [selectedImage , setSelectedImage] = useState(null);
    // const [AssistantName , setAssistantName] = useState("");

    // Function to fetch the current user
//     const handleCurrentUser = async () => {
//         setLoading(true); // Start loading
//         try {
//             const result = await axios.get(`${serverUrl}/api/user/current`, {
//                 withCredentials: true, // Important: Include cookies for session/authentication
//             });
            
//             if (result.data.success) {
//                 setUserData(result.data.user);
//             } else {
//                 // Handle case where success is false (e.g., user is not logged in)
//                 setUserData(null);
//             }
//         }  catch (error) {
//     // 🔹 Yaha 2 cases: 401 (normal), baaki (actual error)
//     if (error?.response?.status === 401) {
//       // Not logged in – totally fine on first load
//       setUserData(null);
//       // console.error mat karo yaha, warna har refresh pe red error aayega
//     } else {
//       console.error("Error fetching current user:", error);
//       setUserData(null);
//     }
//   } 
//  finally {
//             setLoading(false); // Finish loading
//         }
//     };

const handleCurrentUser = async () => {
  setLoading(true); // Start loading
  try {
    const result = await axios.get(`${serverUrl}/api/user/current`, {
      withCredentials: true, // Important: Include cookies for session/authentication
    });

    if (result.data.success) {
      setUserData(result.data.user);
    } else {
      setUserData(null);
    }
  } catch (error) {
    // 🔹 yaha change:
    if (error?.response?.status === 401) {
      // Not logged in – login / signup pe aana bilkul normal
      setUserData(null);
      // yaha console.error MAT likho, warna har refresh pe red error aayega
    } else {
      console.error("Error fetching current user:", error);
    //   setUserData(null);
    }
  } finally {
    setLoading(false); // Finish loading
  }
};

    const getGeminiResponse = async(command) =>{
        try {
            
            const result =  await axios.post(`${serverUrl}/api/user/ask-assistant`,{command},{
                withCredentials:true
            })

            return result.data

        } catch (error) {
            console.log(error)
        }
    }


    // Run once on component mount to fetch user data
    useEffect(() => {
        handleCurrentUser();
        // The dependency array is empty, so this runs only once when the component mounts.
    }, []); 

    // 3. Define the Context Value
    // This object contains all data and functions that consuming components will receive.
    const value = {
        serverUrl,
        userData,      // The current user data (or null)
        setUserData,   // Function to manually update user data (e.g., after login/logout)
        loading,   
        setLoading,    // Loading status
        handleCurrentUser ,// Function to manually refetch user data,
        frontendImage , setFrontendImage ,
        backendImage , setBackendImage ,
        selectedImage , setSelectedImage,
        getGeminiResponse
        // AssistantName , setAssistantName
        
    };

    // 4. Render the Provider
    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    );
}

export default UserContext;