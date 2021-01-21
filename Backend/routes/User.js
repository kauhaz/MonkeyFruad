const { auth, firestore, googleProvider } = require("../models/index");
const express = require("express"),
  passport = require("passport");
(multer = require("multer")), (router = express.Router());
const bcrypt = require("bcryptjs");
const { Result } = require("express-validator");
router.post("/signup", async (req, res) => {
  try {
    const {
      firstname,
      surname,
      sex,
      province,
      email,
      password,
      username,
      phone
    } = req.body;
    console.log(firstname,
      surname,
      sex,
      province,
      email,
      password,
      username,
      phone)
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          console.log(result)
          if (result) {
            const userRef = firestore.collection("User").doc(result.user.uid);
            userRef.set({
              uid: result.user.uid,
              username:username,
              email: result.user.email,
              firstname: firstname,
              surname: surname,
              sex: sex,
              phone : phone,
              province: province,
              role: "user",
              type:"On web"
            });
            return res.json({ user: result });
          }
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        }); 
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/googlesignup", function (req, res) {
 try{
  const {
  result
  } = req.body;

  if (result) {
    const userRef = firestore.collection("User").doc(result.user.uid);
    userRef.get().then((doc)=>{
      if(!doc.data()){
      userRef.set({
        uid: result.user.uid,
        email: result.user.email,
        displayName : result.user.displayName,
        photoURL : result.user.photoURL,
        created: new Date().valueOf(),
        role: "user",
        type:"Google"
      });
      return res.json({ msg: "google signup success" });
    } else {
      res.status(200).json({msg:"มีผู้ใช้งานนี้อยู่แล้ว"})
    }
    })
  }
 }
 catch{(err)=>{
  res.status(400).json({ error: err });
 }
 }
});

router.post("/facebooksignup", function (req, res) {
  try{
   const {
   result
   } = req.body;
   if (result) {
    
     const userRef = firestore.collection("User").doc(result.user.uid);
     userRef.get().then((doc)=>{
       if(!doc.data()){
       userRef.set({
         uid: result.user.uid,
         email: result.user.email,
         displayName : result.user.displayName,
         photoURL : result.user.photoURL,
         created: new Date().valueOf(),
         role: "user",
         type:"Facebook"
       });
       return res.json({ msg: "facebook signup success" });
     } else {
       res.status(200).json({msg:"มีผู้ใช้งานนี้อยู่แล้ว"})
     }
     })
   }
  }
  catch{(err)=>{
   res.status(400).json({ error: err });
  }
  }
 });

router.post("/remember", function (req, res) {
  res.json({ success: true });
});

router.post("/session", function (req, res) {
  const { user } = req.body;
   firestore.collection("User").doc(user.uid).get().then((doc)=>{
    if(doc.exists){
      return res.json({data:doc.data()})
    }
    else{
      console.log("No such document")
    }
  }).catch((Error)=>{
    connsole.log(Error)
  })
});

router.post("/login", function (req, res) {
  const { email, password } = req.body;
  const userLogin = auth
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      res.json({ success: result });
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
});

router.post("/userid",(req,res)=>{
  try{
    const {
      result
      } = req.body;
      
    const userRef = firestore.collection("User").where("uid" , "==" ,result.uid)
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
router.get("/:id", function (req, res) {
  const userID = req.params.id;
  res.json({ success: true });
});
module.exports = router;