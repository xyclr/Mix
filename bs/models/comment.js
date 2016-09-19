var mongoose = require('./db');
var ObjectID = require('mongodb').ObjectID;


var commentSchema = new mongoose.Schema({
    name: String,
    comment: String
}, {
    collection: 'posts'
});

var commentModel = mongoose.model('Comment', commentSchema);


function Comment(name, comment) {
  this.name = name;
  this.comment = comment;
}

module.exports = Comment;

//存储一条留言信息
Comment.prototype.save = function(_id,callback) {
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        year: date.getFullYear(),
        month: date.getFullYear() + "-" + (date.getMonth() + 1),
        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    }
    //要存入数据库的文档
    var comment = {
        name : this.name,
        time : time,
        comment : this.comment
    };
    commentModel.findOne({"_id": new ObjectID(_id)}, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            commentModel.update({"_id": new ObjectID(_id)},  {
                $push: {"comment": comment}
            }, function (err) {
                console.info(err)
            });
            callback(null, doc);//返回查询的一篇文章
        }
    });
};