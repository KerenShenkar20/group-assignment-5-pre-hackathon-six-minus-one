const user = require('../models/user.model');
const url = require('url');
const querystring = require('querystring');
 
exports.userDbController = {
    getUsers(req,res){

        const keys = Object.keys(req.query);
        let bringUsers = user.find({});
        for(let i =0 ; i<keys.length; i++){
            if(keys[i] == 'email') {
                console.log('email');
                bringUsers.find({email:req.query.email});
            }
            else if(keys[i] == 'job') {
                console.log('job');
                bringUsers.find({job:req.query.job});
            }
            else if(keys[i] == 'gender'){
                console.log('gender');
                bringUsers.find({gender:req.query.gender});
            }
        }
        bringUsers
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));    
        // if(keys.length == 1){
            
        //     if(keys == "gender") {
        //         console.log('gender');
        //         user.find({gender:req.query.gender})
        //         .then(docs => { res.json(docs)})
        //         .catch(err => console.log(`Error getting the data from db: ${err}`));
        //     }
        //     else if(keys == "job"){
        //         console.log('job');
        //         user.find({job:req.query.job})
        //         .then(docs => { res.json(docs)})
        //         .catch(err => console.log(`Error getting the data from db: ${err}`));
        //     }
        //     else if(keys == "email") {
        //         user.find({email:req.query.email})
        //         .then(docs => { res.json(docs)})
        //         .catch(err => console.log(`Error getting the data from db: ${err}`));
        //     }
        // }
        // else if(keys.length > 1){
            
        //}
        // else if(keys[0] == 'email' && keys[1] == 'job'){
        //         const us = user.find({job:req.query.job});
        //         us.find({email: req.query.email})
        //         //user.find({job:req.query.job, email: req.query.email, gender: req.query.gender})
        //         .then(docs => { res.json(docs)})
        //         .catch(err => console.log(`Error getting the data from db: ${err}`));
        //     }
        // }
        // else {
        //     user.find({})
        //     .then(docs => { res.json(docs)})
        //     .catch(err => console.log(`Error getting the data from db: ${err}`));
        // }
    },
    addUser(req,res){
        const newUser = new user({
            //check, validations
            "id": req.body.id,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "gender": req.body.gender,
            "avatr": req.body.avatr,
            "color": req.body.color,
            "job": req.body.job
        });
        const result = newUser.save();
        if (result){
            res.json(result)
        } else{
            res.status(404).send("Error saving a user");
        }
    },
    getUser(req,res) {
        const id = req.params.id;
        user.findOne({id: id})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    updateUser(req,res){
    //validation
      user.updateMany({id:req.params.id},{first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email,gender:req.body.gender,color:req.body.color,job:req.body.job})
      .then(docs => { res.json(docs)})
      .catch(err => console.log(`Error updating user from db: ${err}`));  
    },
    deleteUser(req,res){
        //user.deleteMany({id:{$in: [1,3,5,7,9]}})
        user.deleteOne({id:req.params.id})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error deleting user from db: ${err}`));  
    },

}

