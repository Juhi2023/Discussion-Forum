const mongoose = require('mongoose');
const connectToMongo = ()=>{
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    }, ()=>{
        console.log('connected successfully');
    });

}

module.exports = connectToMongo;