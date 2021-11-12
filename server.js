const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const welcome = require("./routes/welcome");
const register = require("./routes/register");
const login = require("./routes/login");
const logout = require("./routes/logout");
const forgot = require("./routes/forgotpassword");
const resetpwdcheck = require("./routes/resetpasscheck");
const resetpwd = require("./routes/resetpwd");
const authchecker = require("./routes/authchecker");
const dashboard = require("./routes/dashboard");
const storefiles = require("./routes/storefiles");
const activate = require("./routes/activateaccount");
const getfiles = require("./routes/getfiles");
const config = require("./config");
const imagecontroller = require("./imagecontroller");
const {
    PORT,SESS_SECRET,DB_USERNAME,DB_PASSWORD,DB_CLUSTER,DB_NAME,COOKIE_NAME
} = require("./helpers/environment");
const MAX_AGE = 1000 * 60 * 10 ; // 10min
app.set('trust proxy',1);
// setting up cors
app.use(cors({
  origin: 'https://cloudsynk.netlify.app',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD','DELETE'],
  credentials: true,
  allowedHeaders: 'Content-Type, *'
}));
// setting up connect-mongodb-session store
const mongoDBstore = new MongoDBStore({
    uri: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
    collection: "mySessions"
});
// Express Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Express-Session
app.use(
    session({
      name: COOKIE_NAME, 
      secret: SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      store: mongoDBstore,
      cookie: {
        maxAge: MAX_AGE,
        secure:true,
        sameSite:"None",
        httpOnly:true,
      }
    })
  );

// routes
app.use("/main",welcome);
app.use("/auth",register,login,logout,forgot,resetpwdcheck,resetpwd,authchecker,activate);
app.use("/users",dashboard,storefiles,getfiles);

//aws
app.post("/api/uploadImage",imagecontroller.uploadImageToS3);
app.listen(PORT, ()=> console.log("App running on port:",PORT));