const Forum = require('../models/Forum')

const getUserQuestions = async (req, res)=>{
    
    try{
        const userQuestions = await Forum.find({email: req.user.email}).sort({date:1});
        return res.status(201).json({status: 'SUCCESS', data: userQuestions})
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

const getAllQuestions = async (req, res)=>{
    
    try{
        const allQuestions = await Forum.find().sort({views: -1, search: -1});
        return res.status(201).json({status: 'SUCCESS', data: allQuestions})
    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

const createQuestion = async (req, res)=>{
    
    try{
        if(!req.body.question){
            return res.status(400).json({
                status: "FAILED",
                message: 'Plz enter valid data.'
            })
        }
        const newQuestion = new Forum({userID: req.user._id, email: req.user.email, question: req.body.question})
        const userQuestion = await newQuestion.save();
        return res.status(201).json({status: 'SUCCESS', message:'Question created successfully.'})

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

const addAnswer = async(req, res)=>{
    try{
        console.log(req.body.answer)
        if(!req.body.answer){
            return res.status(400).json({
                status: "FAILED",
                message: 'Plz enter valid data.'
            })
        }
        Forum.updateOne({_id:req.body.forumID}, { $push: { comments: {comment:req.body.answer, name: req.user.name, email: req.user.email, date: Date.now()} } }, function(err, doc) {
            if (err)  return res.status(400).json({status: 'FAILURE', message:'ID not found'})
                return res.status(201).json({status: 'SUCCESS', message:'Answer added successfully.'})
        })


    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

const getQuestion = async(req, res)=>{
    try{
        if(!req.params.id){
            return res.status(400).json({
                status: "FAILED",
                message: 'Plz enter valid data.'
            })
        }
        Forum.findOne({_id:req.params.id}, function(err, doc) {
            if (err)  return res.status(400).json({status: 'FAILURE', message:'ID not found'})
                return res.status(201).json({status: 'SUCCESS', data:doc})
        })

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

const search=(req, res)=>{
    try{
        
        if(!req.body.searchData){
            return res.status(400).json({
                status: "FAILED",
                message: 'Plz enter valid ID.'
            })
        }
        Forum.updateMany( {question:{ $regex: ".*" + req.body.searchData + ".*", $options: "i" }}, {$inc:{ search: 1}}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            console.log(doc)
            Forum.find({question:{ $regex: ".*" + req.body.searchData + ".*", $options: "i"  }}, function(err, doc){
                if (err) return res.send(500, {error: err});
                console.log(doc)
                return res.status(201).json({status: 'SUCCESS',data: doc})
            })
            
        })

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

const incrementView =(req, res)=>{
    try{
        
        if(!req.body.forumID){
            return res.status(400).json({
                status: "FAILED",
                message: 'Plz enter valid ID.'
            })
        }
        Forum.updateOne({_id:req.body.forumID}, {$inc:{ views: 1}}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.status(201).json({status: 'SUCCESS', message:'view increased successfully.'})
        })

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error"
        })
    }
}

module.exports = {getUserQuestions, getAllQuestions, createQuestion, addAnswer, incrementView, getQuestion, search} 