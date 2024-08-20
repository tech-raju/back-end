// require('dotenv').config({path: './env'})
// import mongoose from "mongoose";
// import { DB_Name } from "./constants";

import express from "express"
const app = express()

import dotenv from "dotenv"
import connectDB from "./db/db_connect.js";

dotenv.config({
  path: './env'
})


 

connectDB()



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