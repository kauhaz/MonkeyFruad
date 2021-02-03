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
    const {name,surname,id,accountnumber,nameproduct,productcategory,money,bank,social,other,useruid , username ,photoprofilepublic_id , photoprofileurl} = req.body
    let {datetime} = req.body
    const uid = uuidv4()
    const newmoney = Number(money)
    let photoURL = {public_id : photoprofilepublic_id , url : photoprofileurl}
    
    // const date = moment().format('MM/DD/YYYY, h:mm:ss a')
    moment.locale('th')
    const date =  moment().format('lll')
    datetime = moment(datetime).format('lll')
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
      
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money : newmoney,bank, datetime,social,other,uid,useruid,date,resultfileitem,item,username , photoURL})

      const getpost = await firestore.collection("Post").where("accountnumber" , "==" , accountnumber).orderBy("datetime", "desc")
      
      getpost.get().then((doc)=>{
     
        let items = []
     
        doc.forEach(doc2 =>{
         items.push(doc2.data())    
        })
        let sum = 0
        items.forEach(res =>{
          sum += res.money
        })

        let count = 0
        for(i=1 ; i<=items.length ; i++){
          count++
        }
      
       const wanteedon = items[0].datetime
        const Thief = firestore.collection("Thief").doc(accountnumber).set({name,surname,accountnumber,summoney : sum,bank,wanteedon,count})
      })
    }
    else if(file){
      const resultfile = await cloudinary.uploader.upload(file[0].path)
      const {url,public_id} = resultfile
      const resultfileitem = {url,public_id}
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money : newmoney,bank,datetime,social,other,uid,useruid,date,resultfileitem,username , photoURL})
      const getpost = await firestore.collection("Post").where("accountnumber" , "==" , accountnumber).orderBy("datetime", "desc")
      
      getpost.get().then((doc)=>{
     
        let items = []
     
        doc.forEach(doc2 =>{
         items.push(doc2.data())    
        })
        let sum = 0
        items.forEach(res =>{
          sum += res.money
        })

        let count = 0
        for(i=1 ; i<=items.length ; i++){
          count++
        }
      
        const wanteedon = items[0].datetime
        const Thief = firestore.collection("Thief").doc(accountnumber).set({name,surname,accountnumber,summoney : sum,bank,wanteedon,count})
      })

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
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money : newmoney,bank,datetime,social,other,uid,useruid,date,item,username , photoURL})
      const getpost = await firestore.collection("Post").where("accountnumber" , "==" , accountnumber).orderBy("datetime", "desc")
      
      getpost.get().then((doc)=>{
     
        let items = []
     
        doc.forEach(doc2 =>{
         items.push(doc2.data())    
        })
        let sum = 0
        items.forEach(res =>{
          sum += res.money
        })

        let count = 0
        for(i=1 ; i<=items.length ; i++){
          count++
        }
      
        const wanteedon = items[0].datetime

        const Thief = firestore.collection("Thief").doc(accountnumber).set({name,surname,accountnumber,summoney : sum,bank,wanteedon,count})
      })

    }
    else if(!file && !files){
      const create = await firestore.collection("Post").doc(uid).set({name,surname,id,accountnumber,nameproduct,productcategory,money : newmoney,bank,datetime,social,other,uid,useruid,date,username , photoURL})
      const getpost = await firestore.collection("Post").where("accountnumber" , "==" , accountnumber).orderBy("datetime", "desc")
      
      getpost.get().then((doc)=>{
     
        let items = []
     
        doc.forEach(doc2 =>{
         items.push(doc2.data())    
        })
        let sum = 0
        items.forEach(res =>{
          sum += res.money
        })

        let count = 0
        for(i=1 ; i<=items.length ; i++){
          count++
        }
      
        const wanteedon = items[0].datetime
        const Thief = firestore.collection("Thief").doc(accountnumber).set({name,surname,accountnumber,summoney : sum,bank,wanteedon,count})
      })

    }
      return res.json({ success: "สร้างโพสสำเร็จ" });
  }catch(err){
    console.log(err)
    return res.status(500).json({msg : err})
  } 
  
});
router.post("/edit/:uid",uploadFile,async (req, res) => {
  try{
    let file = req.files.photo
    let files = req.files.eiei
  let uid = req.params.uid
  // const date = moment().format('MM/DD/YYYY, h:mm:ss a')
    moment.locale('th')
    const date =  moment().format('lll')
  const {name,surname,id,accountnumber,nameproduct,productcategory,money,bank,social,other} = req.body
  let {datetime} = req.body
  const newmoney = Number(money)
  datetime = moment(datetime).format('lll')
    if(file && files){
      const resultfile = await cloudinary.uploader.upload(file[0].path )
      let item = []
      for(const file of files){
        const {path} = file
        const resultfiles = await cloudinary.uploader.upload(path)
        let {url,public_id} = resultfiles
        item.push({url,public_id})
      }
      const update = await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money : newmoney,bank,datetime,social,other,date,resultfile,item,username , photoURL})
      const getpost = await firestore.collection("Post").where("accountnumber" , "==" , accountnumber).orderBy("datetime", "desc")
      getpost.get().then((doc)=>{
        let items = []
        doc.forEach(doc2 =>{
         items.push(doc2.data())    
        })
        let sum = 0
        items.forEach(res =>{
          sum += res.money
        })

        let count = 0
        for(i=1 ; i<=items.length ; i++){
          count++
        }
      
        const wanteedon = items[0].datetime
        const Thief = firestore.collection("Thief").doc(accountnumber).set({name,surname,accountnumber,summoney : sum,bank,wanteedon,count})
      })

    }
    else if(file){
      const resultfile = await cloudinary.uploader.upload(file[0].path )
      const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money : newmoney,bank,datetime,social,other,date,resultfile,username , photoURL})
      const getpost = await firestore.collection("Post").where("accountnumber" , "==" , accountnumber).orderBy("datetime", "desc")
      
      getpost.get().then((doc)=>{
     
        let items = []
     
        doc.forEach(doc2 =>{
         items.push(doc2.data())    
        })
        let sum = 0
        items.forEach(res =>{
          sum += res.money
        })

        let count = 0
        for(i=1 ; i<=items.length ; i++){
          count++
        }
      
        const wanteedon = items[0].datetime
        const Thief = firestore.collection("Thief").doc(accountnumber).set({name,surname,accountnumber,summoney : sum,bank,wanteedon,count})
      })

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
      const update =await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money : newmoney,bank,datetime,social,other,date,item,username , photoURL})
      const getpost = await firestore.collection("Post").where("accountnumber" , "==" , accountnumber).orderBy("datetime", "desc")
      
      getpost.get().then((doc)=>{
     
        let items = []
     
        doc.forEach(doc2 =>{
         items.push(doc2.data())    
        })
        let sum = 0
        items.forEach(res =>{
          sum += res.money
        })

        let count = 0
        for(i=1 ; i<=items.length ; i++){
          count++
        }
      
        const wanteedon = items[0].datetime
        const Thief = firestore.collection("Thief").doc(accountnumber).set({name,surname,accountnumber,summoney : sum,bank,wanteedon,count})
      })

    }
   else if(!file && !files){
    const update = await firestore.collection("Post").doc(uid).update({name,surname,id,accountnumber,nameproduct,productcategory,money : newmoney,bank,datetime,social,other,date,username , photoURL})
    const getpost = await firestore.collection("Post").where("accountnumber" , "==" , accountnumber).orderBy("datetime", "desc")
      
    getpost.get().then((doc)=>{
   
      let items = []
   
      doc.forEach(doc2 =>{
       items.push(doc2.data())    
      })
      let sum = 0
      items.forEach(res =>{
        sum += res.money
      })

      let count = 0
      for(i=1 ; i<=items.length ; i++){
        count++
      }
    
      const wanteedon = items[0].datetime

      const Thief = firestore.collection("Thief").doc(accountnumber).set({name,surname,accountnumber,summoney : sum,bank,wanteedon,count})
    })

   } 
   return res.json({
      success : "แก้ไขสำเร็จ"
    })
  }catch(err){
   return res.status(500).json({msg : err})
  }
  
});






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


router.get("/post",async (req, res) => {
  try{
      const showdata = await firestore.collection("Post")
      showdata.get().then(ok =>{
        let item = [];
        ok.forEach((doc) => {
          item.push(doc.data())
        });
        return  res.json({
          item
        })
  })
  }catch(err){
   return res.status(500).json({msg : err})
  }
  
});
router.get("/orderbyfacebook",async (req, res) => {
  try{
      const showdata = await firestore.collection("Post").where("social" , "==" ,"Facebook").orderBy("datetime","desc").limit(4)
      showdata.get().then(element =>{
        let data = [];
        element.forEach((doc) => {
          data.push(doc.data())
        });
        return res.json({
          data : data
        })
      })
    }catch(err){
        return res.status(500).json({msg : err})
       }
  })
router.get("/orderbyinstragram",async (req, res) => {
    try{
      var data = [];
      const showdata = await firestore.collection("Post").where("social" , "==" ,"Instagram").orderBy("datetime","desc").limit(4).get()
      .then(element =>{
        element.forEach((doc) => {
          data.push(doc.data())
        });
        console.log(data)
      })
      return res.json({
        data : data
      })
      }catch(err){
          return res.status(500).json({msg : err})
         }
    })
router.get("/orderbyline",async (req, res) => {
      try{
      var data = [];
          const showdata = await firestore.collection("Post").where("social" , "==" ,"Line").orderBy("datetime","desc").limit(4).get()
          .then(element =>{
            element.forEach((doc) => {
              data.push(doc.data())
            });
          })
          return res.json({
            data : data
          })
        }catch(err){
            return res.status(500).json({msg : err})
           }
      })
router.get("/orderbytwitter",async (req, res) => {
        try{
          const showdata = await firestore.collection("Post").where("social" , "==" ,"Twitter").orderBy("datetime","desc").limit(4)
          showdata.get().then(element =>{
            let data = [];
            element.forEach((doc) => {
              data.push(doc.data())
            });
            return res.json({
              data : data
            })
          })
          }catch(err){
              return res.status(500).json({msg : err})
             }
        })
router.get("/orderbywebsite",async (req, res) => {
          try{
            const showdata = await firestore.collection("Post").where("social" , "==" ,"Website").orderBy("datetime","desc").limit(4)
            showdata.get().then(element =>{
              let data = [];
              element.forEach((doc) => {
                data.push(doc.data())
              });
              return res.json({
                data : data
              })
            })
            }catch(err){
                return res.status(500).json({msg : err})
               }
          })

// router.post("/upload", upload.array("eiei"), async(req, res) => {
//   try{
//         console.log(req.files.path)
//   }catch(err){
//     res.status(500).json({msg : err})
//   }
  
// });
router.post("/comment/:id", async (req, res) => {
   try{
    
    const { textcomment , username , userid} = req.body
      const postid = req.params.id
      const uuid = uuidv4()
      moment.locale()
      const datetime = moment().format('LTS')
      const savetodb = await firestore.collection("Comment").doc(uuid).set({ commentid : uuid , postid , username ,textcomment, datetime , userid })
    
      
   }catch(err){
     console.log(err)
   }
  });

  // router.get("/comment/:id", async (req, res) => {
  //   try{  

  //     let idpost = req.params.id
      
  //      const getcomment = await firestore.collection("Comment").where("postid" , "==" , idpost ).orderBy("datetime", "desc")
    
  //     //  const userpost = await firestore.collection("User").where(uid , "==" ,  ).get()
  //     getcomment.get().then((doc)=>{
  //       let item = []
  //       doc.forEach( doc2 =>{
  //        item.push(doc2.data())

  //       })
       
        
  //         return res.json({
  //            item
  //          })
       
  //       })
  //   }catch(err){
  //     return res.status(500).json({
  //       msg : err
  //     })
  //   }
  //  });


  router.get("/comment/:id", async (req, res) => {
    try{  
      let postid = req.params.id
       const getcomment = await firestore.collection("Comment").where("postid" , "==" , postid ).orderBy("datetime" , "desc")
      
      getcomment.get().then((doc)=>{
        let item = []
        doc.forEach(doc2 =>{
         item.push(doc2.data())

        })

          console.log(item)
          return res.json({
             item
           })
       
        })
    }catch(err){
      return res.status(500).json({
        msg : err
      })
    }
   });



   router.post("/delete/comment/:uid",async(req, res) => {
    try{
      let getid = req.params.uid
    
      const postdelete = await firestore.collection("Comment").doc(getid).delete()
      return  res.json({ success: "Delete" });
    }catch(err){
      return  res.status(500).json({msg : err})
    }
    
  });

  router.post("/edit/comment/:id",async (req, res) => {
    try{
      let id = req.params.id
      let {textcomment} = req.body
  
      if(textcomment == ""){
        const commentdelete = await firestore.collection("Comment").doc(id).delete()
      }
      else{
        const commentedit = await firestore.collection("Comment").doc(id).update({textcomment})
      }
    }catch(err){
     return res.status(500).json({msg : err})
    }
    
  });
  
  
  
  
  


// const userRef = firestore.collection("User")




module.exports = router;