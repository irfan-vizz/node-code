import mongoose from 'mongoose';
const addressSchema = mongoose.Schema({
    street:{
        type:String,
    },
    city:{
        type:String,
    },
    province:{
        type:String,
    },
    country:{
        type:String,
    },
    postal:{
        type:String,
    }
})
const buildingSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true,
            trim: true
        },
        area:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        address:addressSchema,
        file:{
            type:String,
            required:true
        }
       
    },
    {
        timestamps:true
    }
);

const buildingModel = mongoose.model('buildings', buildingSchema);
 export default buildingModel