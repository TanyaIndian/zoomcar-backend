const express=require("express")
const  connect  = require("../src/configs/db")
const {register,otp}=require("../src/controller/auth")
const bulao=require("../src/controller/bulao.controller")
const bookcarController = require("../src/controller/bookingdeatail.controller")
const selectedCity = require("../src/controller/selectedcity.controller")
const userController = require("../src/controller/car.controller")
const cors=require("cors")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/checkpost",bookcarController)
app.use("/cityselect",selectedCity)

app.use("/allcars",userController)


app.use(express.json())
app.use("/register",register)
app.use("/bulao",bulao)
app.use("/otp",otp)

app.listen(5000,async()=>{
    console.log("5000")
    await connect()
}) 