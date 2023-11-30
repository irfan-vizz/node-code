
import postModel from '../models/postModels.js'
import fs from 'fs'
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const staticPath = path.join(__dirname, '..', 'public','uploads');

console.log(staticPath)
const viewPost = (req, res) =>{

    var  srch = req.body.search;
    let reg;
    var query = {};
    reg = '$regex';;
    query[reg] = new RegExp('^.*' + srch + '.*$');
    // console.log('upside if',query[reg]);

    if (req.body.search != 0 && typeof req.body.search !== 'undefined') {
        var querySimple = { "title": srch }
       /*  query = or +':'+ [ { 'title': srch }, { 'desc': srch } ] */
       var filter =[]
         filter = [{ 'title': query[reg]} , {'desc': query[reg] } ]
    var finalQuery ={}
    finalQuery = {$or: filter}
        // console.log("if",filter)
    }
    // console.log("outside else",finalQuery)
    // console.log("outside else 2",srch)
    postModel.find(querySimple).lean().then(data =>{
        /* res.send(data); */

        let post = [{
            'title':"irfan",
            'age':26
        },
        {
            'title':"ali",
            'age':20
        }];
        let data_post = data;
       /*  console.log(data) */
        res.render('post',{
            post:post,
            data_post:data_post
        })

    })
    .catch(err=>{
        res.send(err)
    })
}
const addPost = (req, res) =>{
    /* res.send('Add New Post Here'); */
    res.render('add_post')
    
}
const editPost = (req, res) =>{
/*     res.send('Edit Your Post'); */
    const id = req.params.id;
    console.log('asdasdasdasdasd-------------===========',id); 
    postModel.find({_id:id}).lean().then(data =>{
        console.log('edit by ID', data);
        res.render('edit_post', {
            data:data
        })
    }).catch(err =>{
        res.send(err)
    })
  
   
}
const updatePost = (req, res) =>{
    const id = req.params.id;
    console.log(req.body);
    console.log(req.file);
    var element = {};
    element.title =req.body.title;
    element.description =req.body.desc;
    element.author =req.body.author;
    element.file =req.file?req.file.filename:req.body.file;
    //element.description.trim()
    postModel.findOneAndUpdate({_id:id},element,{upsert: true}).then(data=>{
        /* console.log(data); */
        res.send(data);
    }).catch(err =>{
        res.send(err)
        console.log("errorere+==========================")
    })
}
const insertPost = (req, res) =>{
   /*  res.send(req.body.title); */
    console.log(req.body);
    var element = {};
    element.title =req.body.title;
    element.description =req.body.desc;
    element.author =req.body.author;
    element.file =req.file.filename;
    /* res.send(element.description) */
    postModel.insertMany(element).then(data =>{
       console.log(data); 
        res.redirect('/post');
    })
    .catch(err=>{
        res.send(err)
    });
    /* console.log(element.description); */
   
}

const deletePost = (req, res) =>{
    const id = req.params.id;
    let fileName = ""
    postModel.find({_id:id}).lean().then(data =>{
        console.log('edit by ID', data[0].file);
        fileName = data[0].file;
        const filePath = path.join(__dirname, '..', 'public','uploads', 'posts', fileName);
        console.log(filePath,"path")
        fs.unlink(filePath, (err) =>{
            if(err){
                console.error('File delete error:', err);
            }
            else{
                console.log('File deleted successfully');
                postModel.deleteOne({_id: id}).then(data =>{
                    console.log('deleted data',data)
                    if (data.deletedCount > 0) {
                        res.redirect('/post');
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

  
    
   /*  res.send('Delete Post'); */
   //res.redirect('/post');
}
export {viewPost, addPost, editPost, deletePost, insertPost, updatePost}

(data) => {

}

