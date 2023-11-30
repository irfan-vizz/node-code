import mongoose from 'mongoose';
const userSchema = mongoose.Schema(
    {
        fname:{
            type:String,
            required:true
        },
        lname:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true,
            trim: true
        },
        Buildings:{
            type:Array,
            required:true
        },
        posts:{
            type:Array,
            required:true,
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

const userModel = mongoose.model('users', userSchema);
 export default userModel