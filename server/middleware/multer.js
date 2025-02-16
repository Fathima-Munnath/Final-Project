import multer from "multer";

const storage = multer.diskStorage({  // Corrected import
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});
export const upload = multer({ storage: storage });
