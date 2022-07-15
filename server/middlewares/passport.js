var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/User')


//middileware
module.exports = function(passport){

    let params ={}
    params.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken();
    params.secretOrKey= process.env.JWT_TOKEN

    passport.use(
        new JWTStrategy(params, function(jwt_payload, next){
            let userID = jwt_payload._id;
            User.findOne({_id: userID}, function(err, user){
                if(err){
                    return next(err, false)
                }
                if(user){
                    return next(null, user)
                }else{
                    return next(null, false)
                }
            })
        })
    )
}