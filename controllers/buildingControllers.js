import express from "express";
import buildingModel from "../models/buildingModels.js";
import fs from 'fs'
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, '..', 'public','uploads');
const viewBuildings = (req, res) =>{
    console.log('viewBuildings');
    buildingModel.find().lean().then(data =>{
        // console.log(data)
        res.render('admin/buildingModule/buildings',{
            buildingData : data
        })
    }).catch(err =>{
        res.send(err)
    })
   
}
const addNewBuilding = (req, res) =>{
    console.log('addNewBuilding')
    res.render('admin/buildingModule/insert_building',{

    })
}
const insertBuilding = (req, res) =>{
    // console.log('insertBuilding', req.body)
  
    let address ={
        street:req.body.street?req.body.street:"",
        city:req.body.city?req.body.city:"",
        postal:req.body.postal?req.body.postal:"",
        province:req.body.province?req.body.province:"",
        country:req.body.country?req.body.country:"",
    }
    let building = {
        name: req.body.name?req.body.name:"",
        type: req.body.type?req.body.type:"",
        area: req.body.area?req.body.area:"",
        desc: req.body.desc?req.body.desc:"",
        file: req.file.filename?req.file.filename:"",
        address: address
    }
    // console.log(building,"address")
    buildingModel.insertMany(building).then(data =>{
        // console.log(data); 
         res.redirect('/buildings');
     })
     .catch(err=>{
         res.send(err)
     });
}
const editBuilding = (req, res) =>{
    console.log('editBuilding')
    let id =  req.params.id;
     buildingModel.find({_id:id}).lean().then(data =>{
        res.render('admin/buildingModule/edit_building',{
            editData:data[0]
        })
     }).catch(err =>{
        res.send(err)
     })
}
const updateBuilding = (req, res) =>{
    console.log('updateBuilding')
    let id =  req.params.id;
        console.log(req.body,"body")
    let address ={
        street:req.body.street?req.body.street:"",
        city:req.body.city?req.body.city:"",
        postal:req.body.postal?req.body.postal:"",
        province:req.body.province?req.body.province:"",
        country:req.body.country?req.body.country:"",
    }
    let building = {
        name: req.body.name?req.body.name:"",
        type: req.body.type?req.body.type:"",
        area: req.body.area?req.body.area:"",
        desc: req.body.desc?req.body.desc:"",
        file: req.file?req.file.filename:req.body.file,
        address: address
    }
    buildingModel.findOneAndUpdate({_id:id},building,{upsert:true}).then(data =>{
        // console.log(data,"data")
        res.redirect('/buildings');
    }).catch(err=>{
        res.send(err)
    })
}
const deleteBuilding = (req, res) =>{
    console.log('deleteBuilding')
    const id = req.params.id;
    let fileName = ""
    buildingModel.find({_id:id}).lean().then(data =>{
        console.log('edit by ID', data[0].file);
        fileName = data[0].file;
        const filePath = path.join(__dirname, '..', 'public','uploads', 'buildings', fileName);
       // console.log(filePath,"path")
        fs.unlink(filePath, (err) =>{
            if(err){
                console.error('File delete error:', err);
            }
            else{
                console.log('File deleted successfully');
                buildingModel.deleteOne({_id: id}).then(data =>{
                    console.log('deleted data',data)
                    if (data.deletedCount > 0) {
                        res.redirect('/buildings');
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

export {viewBuildings, addNewBuilding, insertBuilding, editBuilding, updateBuilding, deleteBuilding};