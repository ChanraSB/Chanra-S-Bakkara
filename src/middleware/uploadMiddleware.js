import multer from "multer";
const Multerupload = (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    },
  });
  const fileFilter = function (req, file, cb) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("only .png, .jpg and .jpeg format allowed"));
    }
  };
  const maxSize = 2 * 1024 * 1024;
  var upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: maxSize },
  }).single("image");
  upload(req, res, next, function (err) {
    if (!err) {
      next();
    } else {
      console.log("error upload file");
    }
  });
};
export default Multerupload;
