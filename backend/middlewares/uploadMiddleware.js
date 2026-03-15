import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [".jpg", ".jpeg", ".png", ".webp",".pdf"];
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only image & pdf files are allowed!"), false);
  }
};

export const upload = multer({ storage,
        limits: {
    fileSize: 5 * 1024 * 1024 
  }, fileFilter });
