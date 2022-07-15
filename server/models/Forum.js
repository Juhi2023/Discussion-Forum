const mongoose = require('mongoose')
const { Schema } = mongoose;


const ForumSchema = new Schema({
    userID: {
        type: String,
        required: true
    } , 
  
    email:{
        type: String,
        required: true,
    },

    question:{
        type: String,
        required: true,
    },

    comments: [
        {
            comment: {
                type: String,
            },
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            date: {
                type: Date,
            }
        }
    ],
    
    views:{
        type: Number,
        default: 0,
    },

    search:{
        type: Number,
        default: 0,
    },

    date:{
        type: Date,
        default: Date.now()
    }
  });

const Forum = mongoose.model('forum',ForumSchema)

module.exports = Forum;