const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//CREAT SCHEMA
const UserSchema = new Schema({
  name:{ type: String, required: true },
  email:{ type: String, reaquired: true },
  password:{ type: String, reaquired: true },
  date:{ type: Date, default: Date.now }
});


mongoose.model('users', UserSchema);