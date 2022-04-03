
const express=require("express")

const router=express.Router()

const User=require("../models/user.model")




  router.get("",async(req,res)=>{
    try {
        let u=await User.find().lean().exec()
            console.log(u)
    
        return res.status(201).send(u)    
    } catch (error) {
        return res.status(401).send(error)  
    }
})

module.exports=router