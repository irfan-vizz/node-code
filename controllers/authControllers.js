
import userModel from "../models/userModels.js";
import buildingModel from "../models/buildingModels.js";
import postModel from "../models/postModels.js";

const checkLogin = async (req, res) =>{
    
    console.log('login');
    if(req.session){

        res.redirect('/post')
    }else{
        res.redirect('/admin/login')
    }
}
const loginPage = async (req, res) =>{
    
    console.log('login');
    res.render('admin/authenticaions/login',{
        
    })
}
const registerUser = async (req, res) =>{
    req.body
    console.log('register', req.body);
    req.session.user = req.body.name;
    req.session.email = req.body.email;
    // console.log('register', req.body);
    res.redirect('/')
    
}

export {loginPage,registerUser, checkLogin};