const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//CREAT SCHEMA
const IdeaSchema = new Schema({
  title:{ type: String, required: true },
  details:{ type: String, reaquired: true },
  user:{type: String, required: true},
  date:{ type: Date, default: Date.now }
});


mongoose.model('ideas', IdeaSchema);