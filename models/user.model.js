const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    id: { type: Number, required:true},
    first_name: {type: String, required:true},
    last_name: {type: String},
    email: {type: String},
    gender: {type: String},
    avatar: {type:String},
    color: {type: String},
    job: {type: String},
}, {collection: 'users', strict:false});


//Need validation
//userSchema.
//    path('id')
//    .validate(id=> id>0, "it must be nore then 0");
userSchema.
path('first_name')
.set(first_name => String(first_name).toUpperCase());
const User = model('User', userSchema);

module.exports = User;