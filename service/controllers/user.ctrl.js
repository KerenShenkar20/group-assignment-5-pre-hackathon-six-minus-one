const User = require('../models/user.model');
 
exports.userDbController = {
    getUsers(req,res){
        const keys = Object.keys(req.query);
        const findUsers = User.find({});
        for(let i = 0 ; i < keys.length; i++){
            if(keys[i] == 'email') {
                findUsers.find({email:req.query.email});
            }
            else if(keys[i] == 'job') {
                findUsers.find({job:req.query.job});
            }
            else if(keys[i] == 'gender'){
                findUsers.find({gender:req.query.gender});
            }
            else{res.status(404).send("Error: wrong key");}
        }
        findUsers
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));    
    },
    addUser(req,res){
        const newUser = new User({
            //check, validations
            "id": req.body.id,
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "email": req.body.email,
            "gender": req.body.gender,
            "avatar": req.body.avatar,
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
        User.findOne({id: id})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error getting the data from db: ${err}`));
    },
    updateUser(req,res){
    //validation
       User.updateMany({id:req.params.id},{first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email,gender:req.body.gender,color:req.body.color,job:req.body.job})
      .then(docs => { res.json(docs)})
      .catch(err => console.log(`Error updating user from db: ${err}`));  
    },
    deleteUser(req,res){
        //user.deleteMany({id:{$in: [1,3,5,7,9]}})
        User.deleteOne({id:req.params.id})
        .then(docs => { res.json(docs)})
        .catch(err => console.log(`Error deleting user from db: ${err}`));  
    },
}