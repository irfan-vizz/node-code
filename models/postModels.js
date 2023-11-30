import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true,
            trim: true
        },
        author:{
            type:String,
            required:true
        },
        file:{
            type:String,
            required:true
        }
       
    },
    {
        timestamps:true
    }
);

const postModel = mongoose.model('post', postSchema);
 export default postModel