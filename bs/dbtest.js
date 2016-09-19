var mongodb = require('mongodb');

var server = new mongodb.Server("127.0.0.1",27017,{});//本地27017端口

new mongodb.Db('blog',server,{}).open(function(error,client){//数据库：mongotest
    if(error) throw error;
    var collection = new mongodb.Collection(client,'user');//表：user
    collection.find(function(error,cursor){
        cursor.each(function(error,doc){
            if(doc){
                console.log("name:"+doc.name+" age:"+doc.age);
            }
        });
    });
});