import multer from 'multer'

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, "./tmp/uploads");
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now()+file.originalname);
  }
});

export default multer({storage:storageConfig})
