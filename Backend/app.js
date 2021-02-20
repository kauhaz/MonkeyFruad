const express = require("express"),
  bodyParser = require("body-parser"),
  // passport = require("passport"),
  flash = require("connect-flash"),
   cors = require('cors')
  // passportLocal = require('passport-local'),
  userRoutes = require("./routes/User"),
  postRoutes = require("./routes/Post"),
  thiefRoutes = require("./routes/Thief"),
// set up express
 app = express();
 app.use(express.json({limit: '40mb' }));
 app.use(express.urlencoded({limit: '50mb' , extended:true }))
 app.use(cors())
 

// app
// Set Route
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/thief", thiefRoutes);
const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log("server start on port 7000");
});