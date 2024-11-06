const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "db6l6twxh",
  api_key: "965589238481643",
  api_secret: "iV61dDrnlVq1rMip0QNY8Va9QUs", // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
