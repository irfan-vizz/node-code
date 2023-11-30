import  express from "express";
import {viewBuildings, addNewBuilding, insertBuilding, editBuilding, updateBuilding, deleteBuilding} from '../controllers/buildingControllers.js'
import multer from 'multer';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/buildings')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '.jpg') //Appending .jpg
  }
})

var upload = multer({ storage: storage });

const buildingRouter = express.Router();

buildingRouter.get('/',viewBuildings)
buildingRouter.get('/new',addNewBuilding)
buildingRouter.post('/insert',upload.single('file'),insertBuilding)
buildingRouter.get('/edit/:id',editBuilding)
buildingRouter.post('/update/:id',upload.single('file'),updateBuilding)
buildingRouter.get('/delete/:id',deleteBuilding)
export default buildingRouter;