import multer from "multer";

const Multerupload = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      if (file && file.fieldname) { // Check if 'file' object is defined and has 'fieldname' property
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
      } else {
        cb(new Error('File object is undefined or does not have fieldname property'));
      }
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file && file.mimetype && (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")) {
      cb(null, true);
    } else {
      cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
    }
  };

  const maxSize = 2 * 1024 * 1024; // 2 MB
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: maxSize },
  }).single("image");

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      console.log("Multer error:", err);
      return res.status(400).json({ message: "Multer error occurred", error: err });
    } else if (err) {
      // An unknown error occurred when uploading
      console.log("Unknown error:", err);
      return res.status(500).json({ message: "Unknown error occurred", error: err });
    }
    // Everything went fine
    next();
  });
};

export default Multerupload;
