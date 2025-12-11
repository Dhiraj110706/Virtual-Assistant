import React, { useContext } from "react";
import { userDataContext } from "../context/UserContext.jsx";

const Card = ({ image }) => {
  const { selectedImage, setSelectedImage ,setBackendImage , setFrontendImage} = useContext(userDataContext);

  const isSelected = selectedImage === image;

  return (
    <div
      className={`
        w-36 sm:w-[120px] md:w-[150px]
        h-56 sm:h-[180px] md:h-[250px]
        rounded-2xl overflow-hidden cursor-pointer shadow-lg
        transition-all duration-300
        ${isSelected 
          ? "border-4 border-white shadow-[0_0_20px_rgba(0,0,255,0.4)] scale-105"
          : "border-2 border-[#0000ff66] hover:scale-105 hover:border-blue-400"
        }
      `}
      onClick={() => {setSelectedImage(image) ;
        setBackendImage(null);
        setFrontendImage(null);}
      }
    >
      <img src={image} className="w-full h-full object-cover" alt="assistant" />
    </div>
  );
};

export default Card;
