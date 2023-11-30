import express from "express";
import {viewPost, addPost, editPost, deletePost, insertPost, updatePost} from '../controllers/postControllers.js'
import multer from 'multer';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/posts')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })
  
  var upload = multer({ storage: storage });
const postRouter = express.Router();

 postRouter.all('/' ,viewPost);
 postRouter.get('/add' ,addPost);
 postRouter.post('/add',upload.single('file') ,insertPost);
 postRouter.get('/edit/:id' ,editPost);
 postRouter.post('/update/:id',upload.single('file'), updatePost);
 postRouter.get('/delete/:id' ,deletePost);
 export default postRouter;
