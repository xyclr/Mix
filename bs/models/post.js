var mongoose = require('./db');
var ObjectID = require('mongodb').ObjectID;



var userSchema = new mongoose.Schema({
    name: String,
    title: String,
    tags: String,
    post: String,
    time: {},
    comment : Array,
    thumb : String,
    caseinfo : Array,
    posi : String,
    extra :{}
}, {
    collection: 'posts'
});

var postModel = mongoose.model('Post', userSchema);

function Post(title,tags, post,thumb,caseinfo,posi) {
    this.title = title;
    this.tags = tags;
    this.post = post;
    this.thumb = thumb;
    this.caseinfo = caseinfo;
    this.posi = posi;
}

module.exports = Post;

//存储一篇文章及其相关信息
Post.prototype.save = function (callback) {
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
    var post = {
        title: this.title,
        time: time,
        tags: this.tags,
        post: this.post,
        thumb : this.thumb,
        caseinfo : this.caseinfo,
        posi : this.posi,
        comments: [],
        extra : {
            pv : 0,
            donations : {
                user : {}
            }//捐款统计
        }
    };

    var newPost = new postModel(post);
    //打开数据库
    newPost.save(function (err, doc) {
        if (err) {
            return callback(err);
        }
        callback(null, doc);
    });
};

//获取一篇文章
Post.getOne = function(_id, callback) {
    postModel.findOne({"_id": new ObjectID(_id)}, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            //每访问 1 次，pv 值增加 1
            postModel.update({"_id": new ObjectID(_id)}, {
                $inc: {"extra.pv": 1}
            }, {
                upsert: true
            }, function (err, doc) {
                console.info(err)
            });

            callback(null, doc);//返回查询的一篇文章
        }
    });

};



//返回原始发表的内容（markdown 格式）
Post.edit = function (_id, callback) {
    postModel.findOne({"_id": new ObjectID(_id)}, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            callback(null, doc);//返回查询的一篇文章
        }
    });
};

//更新一篇文章及其相关信息
Post.update = function (_id, title, tags, post,thumb, caseinfo,posi, callback) {
    postModel.update({
        "_id": new ObjectID(_id)
    },{
        $set: {
            "title": title,
            "tags": tags,
            "post": post,
            "thumb": thumb,
            "caseinfo": caseinfo,
            "posi": posi
        }
    },{
        upsert : true
    }, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            callback(null, doc);//返回查询的一篇文章
        }
    });

};

//删除一篇文章
Post.remove = function (_id, callback) {
    postModel.remove({"_id": new ObjectID(_id)}, function (err, doc) {
        if (err) {
            return callback(err);
        }
        if (doc) {
            callback(null);
        }
    });
};

//返回所有文章存档信息
Post.getArchive = function (callback) {

    postModel.find({},{
        "name": 1,
        "time": 1,
        "title": 1
    }, {},function (err, docs) {
        if (err) {
            return callback(err);
        }
        callback(null, docs);
    });
};

//返回用户信息
Post.getUser = function (callback) {
    postModel.find({},{
        "name": 1,
        "time": 1,
        "title": 1
    }, {},function (err, docs) {
        if (err) {
            return callback(err);
        }
        callback(null, docs);
    });
};

//返回通过标题关键字查询的所有文章信息
Post.search = function(keyword, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var pattern = new RegExp("^.*" + keyword + ".*$", "i");
            collection.find({
                "title": pattern
            }, {
                "name": 1,
                "time": 1,
                "title": 1
            }).sort({
                    time: -1
                }).toArray(function (err, docs) {
                    mongodb.close();
                    if (err) {
                        return callback(err);
                    }
                    callback(null, docs);
                });
        });
    });
};
