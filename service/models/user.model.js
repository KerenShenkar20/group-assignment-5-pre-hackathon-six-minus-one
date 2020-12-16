const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    id: { type: Number, required:true},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    gender: {type: String},
    avatar: {type:String},
    color: {type: String},
    job: {type: String},
}, {collection: 'users', strict:false});


//Need validation

const User = model('User', userSchema);

module.exports = User;