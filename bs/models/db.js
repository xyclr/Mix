var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');
//mongoose.connect('mongodb://root:Ndesig123456@123.57.80.184/bs');
mongoose.Obj = mongoose.ObjectID;
module.exports = mongoose;
