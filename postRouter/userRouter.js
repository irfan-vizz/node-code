import  express from "express";
import {viewUsers, addNewUser, insertUser, editUser, updateUser, deleteUser} from '../controllers/userControllers.js'
import multer from 'multer';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/users')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });

const userRouter = express.Router();

userRouter.get('/',viewUsers)
userRouter.get('/new',addNewUser)
userRouter.post('/insert',upload.single('file'),insertUser)
userRouter.get('/edit/:id',editUser)
userRouter.post('/update/:id',upload.single('file'),updateUser)
userRouter.get('/delete/:id',deleteUser)
export default userRouter;