

const express=require("express")

const router=express.Router()
const jwt=require("jsonwebtoken")
const User=require("../models/user.model")
const otpGenerator = require('otp-generator')
const fast2sms = require('fast-two-sms')

// require("dotenv").config()
//we have to remeber masaisecret
const genToken=(user)=>{
    console.log("masai")
    return jwt.sign({user},"masai")
}


var arr=[]
const otp= async(req,res)=>
{
    try{
  const val = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false })
//   s6gfiVbZ1EnzmuLAwkDFSjB5XJQCa3xGy4oPRN7rO9hcYTK8WdTjreK8bowfzXRykIqSN10pZHPn64ls
//   zV0FbWdsRpYw1guqTol2IxnmvZaPDj9X6iKLcJfk7GQrBONyA4hDU7z12dtAfys4l8PLnIbJXSE5Wmow
  console.log(val)
  var options = {authorization : "s6gfiVbZ1EnzmuLAwkDFSjB5XJQCa3xGy4oPRN7rO9hcYTK8WdTjreK8bowfzXRykIqSN10pZHPn64ls"
    , message : `hello user your otp ${val} from zoomcar` ,  numbers : ['7903553087','9927620365','8309795495']} 
  fast2sms.sendMessage(options)
 .then((response)=>
 {
     console.log(response)
 }) 
   return res.send(val)
}
    
    catch(err)
    {
        return res.send(err)
    }
}



 const register= async(req,res)=>{
    try {

       let user=await User.findOne({email:req.body.email,number:req.body.number})
         
       if(user){
       
           console.log("already")
         
       return res.status(401).send("email already exist")
       }
       else{
           
           const token=genToken(user)
           user= await User.create(req.body)
           console.log(user)
           return res.status(201).send({user,token})
       }

       
    } catch (er) {
        res.status(401).send(er.message)
    }

}


// const register=async(req,res)=>{
//     try {

//         if ()
//         let user=await User.create(req.body)
//         console.log(user)
//         return res.send(user)
//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports={register,otp} 