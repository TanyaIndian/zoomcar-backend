const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name:{type:String, reuired:true},
    email:{type:String, reuired:true},
    number:{type:String, reuired:true},
},
{
    timestamps:true,
    versionkey:false
}
)

const User=mongoose.model("user",userSchema)
module.exports=User