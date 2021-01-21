const express = require("express"),
  passport = require("passport");
 
router = express.Router();
const {firestore} = require("../models/index")
const admin = require("firebase-admin");
const moment = require("moment")
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("../utils/cloudinary")
const multer = require("multer");
const path = require("path");
const e = require("express");


let storage = multer.diskStorage({
  // destination: (req,file,cb) =>{
  //   cb(null, path.join(__dirname, '../../Frontend/public/uploads'))
   
    
  // },
  filename : (req,file,cb) =>{
    cb(null , file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
})

let fileFilter = (req, file , cb ) =>{
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
    cb(null, true)
   
  }else{
  
    return cb(new Error('** ต้องเป็นไฟล์ png หรือ jpeg เท่านั้น **'));
  }
}

let upload = multer({
  storage : storage,
  fileFilter : fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024
}
})

const uploadFile = (req, res, next) =>{
  const upload2 = upload.fields([{name: "photo" ,maxCount:1} , {name: "eiei" , maxCount:10} ])
  upload2(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({msg : "** ไฟล์รูปต้องมีขนาดไม่เกิน 1 MB **"})
      } else if (err) {
        return res.status(400).json({msg : err.message})
      } 
      next()
  })
}


// router.get("/", function (req, res) {
//   res.json({ success: true });
// });



router.post("/create",uploadFile,async(req, res) => { 
  try{
    let file = req.files.photo 
    let files = req.files.eiei 

    
    const {name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,useruid} = req.body
    const uid = uuidv4()
    const date = moment().format('MM/DD/YYYY, h:mm:ss a')
    // console.log(file)
    // console.log(files)
    if(!files){
      return res.status(400).json({msg : "** กรุณาแนบหลักฐานการโอนเงินและหลักฐานการโดนโกง **"})
    }
    else if(file && files ){
      const resultfile = await cloudinary.uploader.upload(file[0].path)
      const {url,public_id} = resultfile
      const resultfileitem = {url,public_id}
      let item = []
      for(const file of files){
        const {path} = file
        const resultfiles = await cloudinary.uploader.upload(path )
        let {url,public_id} = resultfiles
        item.push({url,public_id})
      }
      console.log(item)
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date,resultfileitem,item})
    }
    else if(file){
      const resultfile = await cloudinary.uploader.upload(file[0].path)
      const {url,public_id} = resultfile
      const resultfileitem = {url,public_id}
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date,resultfileitem})
    }
    else if(files){
      let item = []
      for(const file of files){
        const {path} = file
        const resultfiles = await cloudinary.uploader.upload(path)
        let {url,public_id} = resultfiles
        item.push({url,public_id})
      }
      console.log(item)
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date,item})
    }
    else if(!file && !files){
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date})
    }
      
   
      return res.json({ success: "สร้างโพสสำเร็จ" });
  }catch(err){
    // console.log(err)
    return res.status(500).json({msg : err})
  } 
  
});
router.post("/edit/:uid",uploadFile,async (req, res) => {
  try{
    let file = req.files.photo
    let files = req.files.eiei
  let uid = req.params.uid
  const date = moment().format('MM/DD/YYYY, h:mm:ss a')
  const {name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other} = req.body
    // console.log(file)
    // console.log(files)
    if(file && files){
      const resultfile = await cloudinary.uploader.upload(file[0].path )
      let item = []
      for(const file of files){
        const {path} = file
        const resultfiles = await cloudinary.uploader.upload(path)
        let {url,public_id} = resultfiles
        item.push({url,public_id})
      }
      console.log(item)
      const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,date,resultfile,item})
    }
    else if(file){
      const resultfile = await cloudinary.uploader.upload(file[0].path )
      const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,date,resultfile})
    }
    else if(files){
      let item = []
      for(const file of files){
        const {path} = file
        const resultfiles = await cloudinary.uploader.upload(path)
        let {url,public_id} = resultfiles
        item.push({url,public_id})
      }
      console.log(item)
      const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,date,item})
    }
   else if(!file && !files){
    const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,date})
   } 
   return res.json({
      success : "แก้ไขสำเร็จ"
    })
  }catch(err){
   return res.status(500).json({msg : err})
  }
  
});




// router.post("/create" ,async(req, res) => { 
//   try{
//     upload.fields([{name: "photo" ,maxCount:1} , {name: "eiei" , maxCount:10} ]) async(req , res , (err => {
//       if (err) {
//         console.log(err)
//        }
//     }) 
     
//     )
//     const {name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,useruid} = req.body
//     const uid = uuidv4()
//     const date = moment().format('MM/DD/YYYY, h:mm:ss')
//     let file = req.files.photo 
//     let files = req.files.eiei 
//     console.log(file)
//     console.log(files)
//     if(!files){
//       return res.status(400).json({msg : "กรุณาใส่ไฟลล์หลักฐาน"})
//     }

//     else if(file && files ){
//       const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date,file,files})
//     }
//     else if(file){
//       const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date,file})
//     }
//     else if(files){

//       const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date,files})
//     }else{
//       const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money,bank,datetime,social,other,uid,useruid,date})
//     }
    
      
//   return res.json({ success: "สร้างโพสสำเร็จ" });
//   }catch(err){
//     console.log("ok")
//     return res.status(500).json({msg : err})
//   } 
  
// });


// router.get("/search", function (req, res) {
//   res.json({ success: true });
// });

router.get("/edit/:uid",async (req, res) => {
  let uid = req.params.uid
  try{
    
    const showdata = await firestore.collection("Post").where("uid", "==", uid).get()
    showdata.forEach(doc =>{
      let item = []
      console.log(item)
      item.push(doc.data())
      return  res.json({
        item
      })
    })
  
  }catch(err){
    console.log(err)
  }

});






router.post("/delete/:uid",async(req, res) => {
  try{
    let getid = req.params.uid
  //   const finditem = await firestore.collection("Post").where("uid" , "==" , getid).get()
  //   let array = []
  // finditem.forEach(doc =>{
  //   array.push(doc.data())
  // })
  // console.log(array)
  //  await cloudinary.uploader.destroy(array[0].item.map(res =>{
  //   res.public_id
  //  })
  //  )
    const postdelete = await firestore.collection("Post").doc(getid).delete()
    return  res.json({ success: "Delete" });
  }catch(err){
    return  res.status(500).json({msg : err})
  }
  
});



router.get("/mypost/:uid",async(req, res) => {
  try{
    console.log("ok")
    let getid = req.params.uid
  
    const postdelete =await firestore.collection("Post").where("uid" , "==" , getid).get()
    
    postdelete.forEach(doc =>{
      let item = []
      item.push(doc.data())
      return res.json({
        item
      })
    })
  }catch(err){
   return res.status(500).json({msg : err})
  }
  
});

router.post("/postapi",async (req,res)=>{
  try{
    const {
      result
      } = req.body;
    const userRef =await firestore.collection("Post").where("useruid" , "==" ,result.uid).orderBy("date", "desc")
    userRef.get().then((doc)=>{
     let item = []
     doc.forEach(doc2 =>{
      item.push(doc2.data())
     })
        res.json({
          item
        })
     })
  
  }catch{(err)=>{
console.log(err)
  }}
})

// router.post("/upload", upload.array("eiei"), async(req, res) => {
//   try{
//         console.log(req.files.path)
//   }catch(err){
//     res.status(500).json({msg : err})
//   }
  
// });
// router.post("/comment/:id", function (req, res) {
//     res.json({ success: true });
//   });


const userRef = firestore.collection("User")




module.exports = router;