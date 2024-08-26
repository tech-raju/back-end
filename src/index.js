// require('dotenv').config({path: './env'})
// import mongoose from "mongoose";
// import { DB_Name } from "./constants";
// import express from "express"
// const app = express()

import dotenv from "dotenv"
import connectDB from "./db/db_connect.js";
import { app } from "./app.js";




dotenv.config({
  path: './env'
})


 

connectDB()
.then(()=>{
  app.on("error", (error)=>{
    console.log("ERROR: ", error)
    throw error
  })
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running at port : ${process.env.PORT}`)
  })
})
.catch((error) => {
  console.log("MONGOC db connection faild !!", error)
})






// iife
/*
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
    app.on("error", ()=>{
      console.log("ERROR",error)
      throw error
    })

    app.listen(process.env.PORT, ()=>{
      console.log(`App is listening on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log("ERROR",error)
    throw err
  }
})()
  */