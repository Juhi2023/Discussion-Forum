const mongoose = require('mongoose')
const { Schema } = mongoose;
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    } , 
  
    email:{
        type: String,
        required: true,
        unique:true
    },
  
    password:{
      type: String,
      required: true,
    },
  
    date:{
        type: Date,
        default: Date.now()
    },

    tokens: [
        {
            token:{
                type: String,
                required: true,
            }
        }
    ],
    verified: {
        type: Boolean
    }
  });


UserSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
    next();
})

UserSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.JWT_TOKEN);
        this.tokens = this.tokens.concat({token: token})
        this.save();
        return token
    }catch(err){
        console.log(err)
    }
}

const User = mongoose.model('forumUser',UserSchema)

module.exports = User;