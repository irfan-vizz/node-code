import express from "express";
import userModel from "../models/userModels.js";
import buildingModel from "../models/buildingModels.js";
import postModel from "../models/postModels.js";
import fs from 'fs'
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, '..', 'public','uploads');
const viewUsers = async (req, res) =>{
    
    console.log('viewusers');
     userModel.find().lean().then(data =>{
        console.log(data)
        
        res.render('admin/userModule/users',{
            userData : data,
            
        })
    }).catch(err =>{
        res.send(err)
    })
   
}
const addNewUser = async(req, res) =>{
    console.log('addNewUser')
    let buildingList = await buildingModel.find().lean();
    let postList = await postModel.find().lean();
    console.log(postList,"postList")
    res.render('admin/userModule/insert_user',{
        buildingList: buildingList,
        postList: postList
    })
}
const insertUser = (req, res) =>{
    // console.log('insertUser', req.body)
    let user = {
        fname: req.body.fname?req.body.fname:"",
        lname: req.body.lname?req.body.lname:"",
        phone: req.body.phone?req.body.phone:"",
        email: req.body.email?req.body.email:"",
        role: req.body.role?req.body.role:"",
        Buildings: req.body.buildingList?req.body.buildingList:"",
        posts: req.body.postList?req.body.postList:"",
        file: req.file.filename?req.file.filename:""
    }
    // console.log(user,"address")
    userModel.insertMany(user).then(data =>{
        // console.log(data); 
         res.redirect('/users');
     })
     .catch(err=>{
         res.send(err)
     });
}
const editUser = async(req, res) =>{
    console.log('editUser')
    let id =  req.params.id;
    let buildingList = await buildingModel.find().lean();
    let postList = await postModel.find().lean();
     userModel.find({_id:id}).lean().then(data =>{
        res.render('admin/userModule/edit_user',{
            editData:data[0],
            buildingList,
            postList
        })
     }).catch(err =>{
        res.send(err)
     })
}
const updateUser = (req, res) =>{
    console.log('updateUser')
    let id =  req.params.id;
        console.log(req.body,"body")
    let user = {
        fname: req.body.fname?req.body.fname:"",
        lname: req.body.lname?req.body.lname:"",
        phone: req.body.phone?req.body.phone:"",
        email: req.body.email?req.body.email:"",
        role: req.body.role?req.body.role:"",
        Buildings: req.body.buildingList?req.body.buildingList:"",
        posts: req.body.postList?req.body.postList:"",
        file: req.file?req.file.filename:req.body.file
    }
    userModel.findOneAndUpdate({_id:id},user,{upsert:true}).then(data =>{
        // console.log(data,"data")
        res.redirect('/users');
    }).catch(err=>{
        res.send(err)
    })
}
const deleteUser = (req, res) =>{
    console.log('deleteUser')
    const id = req.params.id;
    let fileName = ""
    userModel.find({_id:id}).lean().then(data =>{
        console.log('edit by ID', data[0].file);
        fileName = data[0].file;
        const filePath = path.join(__dirname, '..', 'public','uploads', 'users', fileName);
       // console.log(filePath,"path")
        fs.unlink(filePath, (err) =>{
            if(err){
                console.error('File delete error:', err);
            }
            else{
                console.log('File deleted successfully');
                userModel.deleteOne({_id: id}).then(data =>{
                    console.log('deleted data',data)
                    if (data.deletedCount > 0) {
                        res.redirect('/users');
                      } else {
                        res.send('No documents deleted');
                      }
                }).catch(err =>{
                    res.send(err)
                })
            }
        })
    }).catch(err =>{
        res.send(err)
    })
}

export {viewUsers, addNewUser, insertUser, editUser, updateUser, deleteUser};