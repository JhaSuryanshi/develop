const User = require("../models/usersSchema");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`);
  }
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only images are allowed"));
  }
};

const upload = multer({ storage: imgconfig }); 

exports.userpost = upload.single("image"), async (req, res) => {
    if (err instanceof multer.MulterError) {
      console.log("Multer error:", err);
      res.status(500).json({ error: "File upload failed" });
    } else if (err) {
      console.log("Unknown error:", err);
      res.status(500).json({ error: "An unknown error occurred" });
    } else {
      console.log("Image upload successfully.");
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path);
                
        const { name, email, mobilenumber, message } = req.body;

        if (!name || !email || !mobilenumber || !message) {
          res.status(400).json({ error: "All input is required" });
          return;
        }
        
        const preuser = await User.findOne({ email: email });
        if (preuser) {
          res.status(400).json({ error: "This user already exists in our database" });
          return;
        }

        const userData = new User({
          image: uploadResult.secure_url,
          name,
          email,
          mobilenumber,
          message
        });
        await userData.save();

        res.status(200).json(userData);
      } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };

