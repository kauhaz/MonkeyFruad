
const express = require("express"),
passport = require("passport");

router = express.Router();
const {firestore} = require("../models/index")
const admin = require("firebase-admin");
const moment = require("moment")
const { v4: uuidv4, NIL } = require('uuid');
const cloudinary = require("../utils/cloudinary")
const multer = require("multer");
const path = require("path");
const e = require("express");
const { text } = require("body-parser");

router.get("/orderbycount",async(req, res) => {
    try{
       var data = []
      const orderbycount = await firestore.collection("Theif").orderBy("count","desc").limit(3).get()
      .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          if(doc.exists)
          {
             data.push(doc.data())
          }
        })
      }).catch((err)=>{
          console.log(err)
      })
      return res.json({data:data})
    }catch(err){
     return res.status(500).json({msg : err})
    }
})
    
module.exports = router;