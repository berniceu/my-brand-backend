const cloudinary = require('cloudinary').v2;
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploader = async(file: any, res: any) => {
    try{
        const blogImage = await cloudinary.uploader.upload(file.path, {
            folder: 'uploads',
            use_filename: true,
        });
        return blogImage;
    } catch(err){
        console.log(err);
        return res.status(400).json({message: err})
    }
}

export default uploader;