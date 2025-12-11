import { v2 as cloudinary } from 'cloudinary'

import fs, { unlinkSync } from 'fs';

export const uploadToCloudinary = async (filepath) =>{
    cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

try {
    const uploadResult = await cloudinary.uploader.upload(filepath);
    // return uploadResult.secure_url;
    fs.unlinkSync(filepath); // Delete the file after upload
    return uploadResult.secure_url;
} catch (error) {
    if (fs.existsSync(filepath)) {
            fs.unlinkSync(filepath);
        }
        
        console.error("Cloudinary upload failed:", error);
        
        // Return a clear indicator of failure
        return null;
    
}


}