import { v2 as cloudinary } from 'cloudinary';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

cloudinary.config({
    cloud_name: String(process.env.CLOUD_NAME),
    api_key: String(process.env.API_KEY),
    api_secret: String(process.env.API_SECRET),
});

export default cloudinary;
