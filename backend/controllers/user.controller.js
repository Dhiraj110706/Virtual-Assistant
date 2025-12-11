import User from '../models/user.model.js';
import  { uploadToCloudinary }  from '../config/cloudinary.js';
import geminiResponse from '../gemini.js';
// import User from '../models/user.model.js';
import moment from 'moment';
import { response } from 'express';
// import { response } from 'express';



export const getCurrentUser = async (req, res) => {
  try {
    if (!req.userId) {
  return res.status(401).json({
    success: false,
    message: "Not authenticated",
  });
}

    const userId = req.userId;
    const user =  await User.findById(userId).select("-password")// You can modify this to fetch more user details if needed
    // return res.status(200).json({ userId });
    if(user){
      return  res.status(200).json({ 
        success: true,
        user 
      });
    } else {
      return res.status(404).json({
  success: false,
  message: "User not found"
});

    }
  } catch (error) {
    return res.status(500).json({
  success: false,
  message: 'Error fetching user',
  error: error.message
});

  }     
};

export const updateAssistant  = async (req, res) => {
  try {
    if (!req.userId) {
  return res.status(401).json({
    success: false,
    message: "Not authenticated",
  });
}

    const {assistantName, assistantImageUrl} = req.body;
    let assistantImage  ;
    if(req.file){

      assistantImage = await uploadToCloudinary(req.file.path);
      // assistantImage = req.file.path; // Assuming you're using multer and the file is stored in req.file
    }else{
      assistantImage = assistantImageUrl;
    }

    const user = await User.findByIdAndUpdate(req.userId, {
      assistantName: assistantName,
      assistantImage: assistantImage,
    }, { new: true }).select("-password");

    if (!user) {
  return res.status(404).json({
    success: false,
    message: "User not found"
  });
}


    return res.status(200).json({
      success: true,
      message: 'Assistant updated successfully',
      user
    });

  }  catch (error) {
  console.error("Error updating assistant:", error);
  return res.status(500).json({
    success: false,
    message: "Error updating assistant",
    error: error.message
  });
}

}

export const askToAssistant = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ response: "Not authenticated" });
    }

    const { command } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ response: "User not found" });
    }

    const Name = user.name;
    const assistantName = user.assistantName;

    const result = await geminiResponse(command, assistantName, Name);

    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.status(401).json({ response: "sorry , I can't understand" });
    }

    const gemResult = JSON.parse(jsonMatch);
    const type = gemResult.type;

    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: `Current Date is ${moment().format("YYYY-MM-DD")}`,
        });

      case "get_time":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: `Current Time is ${moment().format("hh:mm A")}`,
        });

      case "get_day":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: `Today is ${moment().format("dddd")}`,
        });

      case "get_month":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: `Current Month is ${moment().format("MMMM")}`,
        });

      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "general":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather-show":
        return res.json({
          type,
          userInput: gemResult.userinput,
          response: gemResult.response,
        });

      default:
        return res
          .status(401)
          .json({ response: "I didn't understand that command." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ response: "Error" });
  }
};
