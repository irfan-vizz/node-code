import  express  from "express";
import {loginPage, registerUser, checkLogin} from "../../controllers/authControllers.js"
const authRouter = express.Router();
authRouter.get('/',checkLogin)
authRouter.get('/login',loginPage)
authRouter.post('/register',registerUser)
export default authRouter