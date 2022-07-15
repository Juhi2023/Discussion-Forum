const express = require('express');
const dotenv = require('dotenv')
const path = require('path')
const passport = require('passport')
const cors = require('cors')
const connectToMongo = require('./config/db');
const userRoutes = require('./routes/users')
const forumRoutes = require('./routes/forum')
dotenv.config({path: path.join(__dirname, '.env')})
const port = process.env.PORT || 5000;

//passport middleware
require('./middlewares/passport')(passport)

//db connection
connectToMongo()


const app = express()
app.use(express.json());
app.use(cors())
app.use(passport.initialize())

//all routes
app.use('/', userRoutes)
app.use('/', forumRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}
  
app.listen(port, ()=>{
    console.log(`DF backend Listening at port ${port}`)
})
