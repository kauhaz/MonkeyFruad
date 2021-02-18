const express = require("express"),
  passport = require("passport");

router = express.Router();
const { firestore } = require("../models/index");
const admin = require("firebase-admin");
const moment = require("moment");
const { v4: uuidv4, NIL } = require("uuid");
const cloudinary = require("../utils/cloudinary");
const multer = require("multer");
const path = require("path");
const e = require("express");
const { text } = require("body-parser");

router.get("/orderbycount", async (req, res) => {
  try {
    var data = [];
    const orderbycount = await firestore
      .collection("Thief")
      .orderBy("count", "desc")
      .limit(3)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            data.push(doc.data());
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return res.json({ data: data });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.get("/orderbysummoney", async (req, res) => {
  try {
    var data = [];
    const orderbysummoney = await firestore
      .collection("Thief")
      .orderBy("summoney", "desc")
      .limit(3)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            data.push(doc.data());
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return res.json({ data: data });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.get("/orderbydatetimes", async (req, res) => {
  try {
    var data = [];
    const orderbydatetimes = await firestore
      .collection("Thief")
      .orderBy("wanteedon", "desc")
      .limit(3)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            data.push(doc.data());
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return res.json({ data: data });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.get("/rankcount", async (req, res) => {
  try {
    var data = [];
    const orderbycount = await firestore
      .collection("Thief")
      .orderBy("count", "desc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            data.push(doc.data());
          }
        });
      });
    return res.json({ data: data });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.get("/thief", async (req, res) => {
  try {
    var item = [];
    const orderbycount = await firestore
      .collection("Thief")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc, index) => {
          if (doc.exists) {
            item.push(doc.data());
          }
        });
        console.log(item);
      })
      .catch((err) => {
        console.log(err);
      });
    return res.json({
      item,
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.get("/post/:uid", async (req, res) => {
  try {
    let thiefid = req.params.uid;
    console.log(thiefid);
    var item = [];
    const orderbycount = await firestore
      .collection("Post")
      .where("accountnumber", "==", thiefid)
      .orderBy("date", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            item.push(doc.data());
          }
        });
        console.log(item);
      })
      .catch((err) => {
        console.log(err);
      });
    return res.json({
      item,
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.post("/post", async (req, res) => {
  try {
    const {get } = req.body;

    if (get) {
      var item = [];
      console.log(get.length);
      for (let i = 0; i < get.length; i++) {
      
        const orderbycount = firestore
          .collection("Post")
          .where("accountnumber", "==", get[i].accountnumber)
          // .where("name" , "==" , get[i].name)
          .orderBy("date", "desc")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              item.push(doc.data());
            });

            console.log(item);
            if (i === get.length - 1) {
              return res.json({
                item,
              });
            }
          });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
});

router.get("/ranksummoney", async (req, res) => {
  try {
    var data = [];
    const orderbycount = await firestore
      .collection("Thief")
      .orderBy("summoney", "desc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            data.push(doc.data());
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return res.json({ data: data });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});
router.get("/rankdatetime", async (req, res) => {
  try {
    var data = [];
    const orderbycount = await firestore
      .collection("Thief")
      .orderBy("wanteedon", "desc")
      .limit(10)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            data.push(doc.data());
          }
        });
        return res.json({ data: data });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
