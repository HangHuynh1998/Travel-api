const cloudinary = require("cloudinary").v2;
const config = require("./config");

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
});

const uploadPhoto = async (file) => {
  const result = await cloudinary.uploader.upload(file);
  return result;
};

const removePhoto = async publicId => {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
};

module.exports = { uploadPhoto , removePhoto};
