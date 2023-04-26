const multer = require('multer');
const path = require("path");
// const fs = require("fs");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage })
//--------------------------------------------------------------------------------

// // Set the destination folder for uploaded files
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Set up multer middleware to handle file uploads
// const upload2 = multer({
//   dest: uploadDir,
// });

//--------------------------------------------------------------------------------

module.exports = upload;
