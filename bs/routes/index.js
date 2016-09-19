var crypto = require('crypto'),
    fs = require('fs-extra'),
    Sys = require('../models/sys.js'),
    User = require('../models/user.js'),
    Post = require('../models/post.js'),
    Card = require('../models/card.js'),
    Comment = require('../models/comment.js'),
    async = require('async'),
    multer  = require('multer'),
    settings = require('../settings');
var url = require('url');


/* 获取Http时间（2012-12-21 19:30形式） */
Date.prototype.getHttpTime = function(){
    return this.getFullYear() + '-' + (this.getMonth()+1) + '-' + this.getDate() +  ' ' + this.getHours() + ':' + this.getMinutes() ;
};


module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {
            title: '主页',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.get('/comment/:_id', checkLogin);
    app.get('/comment/:_id', function (req, res) {
        Post.getOne(req.params._id, function (err, post) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('comment', {
                title: post.title,
                post: post,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.post('/comment/:_id', checkLogin);
    app.post('/comment/:_id', function (req, res) {
        var _id = req.params._id;
        var newComment = new Comment(req.body.name,req.body.comment);
        newComment.save(_id,function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', '留言成功!');
            res.redirect('back');
        });
    });

    app.get('/post', checkLogin);
    app.get('/post', function (req, res) {
        res.render('post', {
            title: '发表',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            settings : settings
        });
    });

    app.post('/post', checkLogin);
    app.post('/post', function (req, res) {
        var post = new Post( req.body.title, req.body.tag, req.body.post,req.body.thumb,[
            req.body.org1,
            req.body.org2,
            req.body.casetime,
            req.body.target
    ],req.body.posi);
        post.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            req.flash('success', '发布成功!');
            res.redirect('/archive');
        });
    });


    app.get('/card', checkLogin);
    app.get('/card', function (req, res) {
        res.render('card', {
            title: '发表',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString(),
            settings : settings
        });
    });

    app.post('/card', checkLogin);
    app.post('/card', function (req, res) {
        var card = new Card( req.body.title, req.body.point, req.body.thumb, req.body.detail, [req.body.time1,req.body.time2], req.body.num);
        card.save(function (err) {
            console.info(err)
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            req.flash('success', '发布成功!');
            res.redirect('/cardarchive');
        });
    });

    app.get('/cardarchive', function (req, res) {
        Card.getArchive(function (err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            res.render('cardarchive', {
                title: '存档',
                posts: posts,
                user: req.session.posts,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/card/:_id', function(req, res){
        Card.getOne(req.params._id, function (err, post) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('cardarticle', {
                title: post.title,
                post: post,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });


    app.get('/cedit/:_id', checkLogin);
    app.get('/cedit/:_id', function (req, res) {
        Card.edit(req.params._id, function (err, post) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            res.render('cedit', {
                title: '编辑',
                post: post,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString(),
                settings : settings
            });
        });
    });



    app.post('/cedit/:_id', checkLogin);
    app.post('/cedit/:_id', function (req, res) {
        Card.update(req.params._id, req.body.title, req.body.point, req.body.thumb, req.body.detail, [req.body.time1,req.body.time2], req.body.num,  req.body.price, function (err) {
            var url = '/card/' + req.params._id;
            if (err) {
                req.flash('error', err);
                return res.redirect(url);//出错！返回文章页
            }
            req.flash('success', '修改成功!');
            res.redirect(url);//成功！返回文章页
        });
    });


    app.get('/cremove/:_id', checkLogin);
    app.get('/cremove/:_id', function (req, res) {
        Card.remove(req.params._id, function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', '删除成功!');
            res.redirect('/');
        });
    });


    app.get('/archive', function (req, res) {
        Post.getArchive(function (err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            console.info(posts);
            res.render('archive', {
                title: '存档',
                posts: posts,
                user: req.session.posts,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/user', function (req, res) {
        Post.getUser(function (err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('archive', {
                title: '用户管理',
                posts: posts,
                user: req.session.posts,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/p/:_id', function(req, res){
        Post.getOne(req.params._id, function (err, post) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('article', {
                title: post.title,
                post: post,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/u/:name/:day/:title', function (req, res) {
        Post.getOne(req.params.name, req.params.day, req.params.title, function (err, post) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('article', {
                title: req.params.title,
                post: post,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString()
            });
        });
    });

    app.get('/edit/:_id', checkLogin);
    app.get('/edit/:_id', function (req, res) {
        Post.edit(req.params._id, function (err, post) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            res.render('edit', {
                title: '编辑',
                post: post,
                user: req.session.user,
                success: req.flash('success').toString(),
                error: req.flash('error').toString(),
                settings : settings
            });
        });
    });



    app.post('/edit/:_id', checkLogin);
    app.post('/edit/:_id', function (req, res) {
        Post.update(req.params._id, req.body.title, req.body.tag, req.body.post,req.body.thumb,[
            req.body.org1,
            req.body.org2,
            req.body.casetime,
            req.body.target
        ],req.body.posi, function (err) {
            var url = '/p/' + req.params._id;
            if (err) {
                req.flash('error', err);
                return res.redirect(url);//出错！返回文章页
            }
            req.flash('success', '修改成功!');
            res.redirect(url);//成功！返回文章页
        });
    });


    app.get('/remove/:_id', checkLogin);
    app.get('/remove/:_id', function (req, res) {
        Post.remove(req.params._id, function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('back');
            }
            req.flash('success', '删除成功!');
            res.redirect('/');
        });
    });


    app.get('/file', function (req, res) {
        var path = settings.uploadPath,fileInfo = [];
        explorer(path);
        function explorer(path){
            fs.readdir(path, function(err, files){
                //err 为错误 , files 文件名列表包含文件夹与文件
                if(err){
                    console.log('error:\n' + err);
                    return;
                };
                files.forEach(function(file){

                    fs.stat(path + '/' + file, function(err, stat){
                        if(err){console.log(err); return;}
                        if(stat.isDirectory()){
                            // 如果是文件夹遍历
                        }else{
                            // 读出所有的文件
                        };
                        fileInfo.push(file);
                    });
                });

                var Timer = true;
                setInterval(function(){
                    if(fileInfo.length == files.length && Timer) {
                        res.render('file', {
                            title: 'file',
                            user: req.session.user,
                            fileInfo : fileInfo,
                            success: req.flash('success').toString(),
                            error: req.flash('error').toString(),
                            settings : settings

                        });
                        Timer = false;
                    }

                },1000);
            });
        }
    });

    app.post('/upload',function(req, res) {
        var  subpath = req.params.name;
        var obj = req.files;
        var realpath = settings.staticSever + req.body.src;
        var tmp_path = obj.file.path;
        var new_path =  realpath + "/" +obj.file.name;
        console.log("原路径："+tmp_path);
        console.log("新路径："+new_path);
        fs.move(tmp_path, new_path, function (err) {
            var scriptStr = "<html><head></head><body>"
            scriptStr += '<script>parent.parent.submitCb("success","upload success!",'+ '"'+req.body.src+'"'+');</script>';
            scriptStr += "<script>" +
            "if(typeof(exec_obj)=='undefined')" +
            "{ " +
            "exec_obj = document.createElement('iframe');" +
            "exec_obj.name = 'tmp_frame'; " +
            "exec_obj.src = '"+ settings.stServer +"/proxy/proxy_upload.html'; " +
            "exec_obj.style.display = 'none'; " +
            "document.body.appendChild(exec_obj); " +
            "}" +
            "else{ " +
            "exec_obj.src = '"+ settings.stServer +"/proxy/proxy_upload.html?' + Math.random(); " +
            "}</script>";
            scriptStr += "</body></html>"
            if (err)  {
                res.write('<script>parent.parent.submitCb("error",err)</script>')
                return console.error(err);
            } else {
                console.log("success!");
                res.write(scriptStr);
            };
            res.end("")

        });
    });

    app.post('/fileDel',function(req, res) {
        var arg = url.parse(req.url, true).query;
        var path = arg.path.replace(/\|/ig,"/");
        var list = arg.list.split("|");
        list.forEach(function (name) {
            console.info(settings.uploadPath  + path +"/" +name);
            fs.unlink(settings.staticSever  + path +"/" +name, function (err) {
                if (err) {
                    throw err;
                }
                console.log('文件:' + name + '删除成功！');
                res.end("over");
            });
        });
    });


    app.get('/sys', checkLogin);
    app.get('/sys', function (req, res) {
        Sys.get("settings", function (err, sys) {
            if (err) {
                sys = [];
            }
            if(!sys) {
                res.render('sys', {
                    title: '系统设置',
                    user: req.session.user,
                    sys : {settings :Sys.initCfg },//加载默认配置
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString(),
                    settings : settings
                });


                var sys = new Sys("settings",Sys.initCfg);

                sys.save(function (err) {
                    if (err) {
                        req.flash('error', err);
                        return res.redirect('/');
                    }
                });

            } else {
                res.render('sys', {
                    title: '系统设置',
                    user: req.session.user,
                    sys : sys,
                    success: req.flash('success').toString(),
                    error: req.flash('error').toString()
                });
            }

        });

    });

    app.post('/sys', checkLogin);
    app.post('/sys', function (req, res) {
        Sys.update("settings",req.body.settingArr, function (err) {
            if (err) {
                req.flash('error', err);
                res.redirect('/sys');
            }
            req.flash('success', '修改成功!');
            res.redirect('/sys');
        });
    });

    app.get('/category', function (req, res) {
        res.render('category', {
            title: '分类',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });



    app.get('/reg', checkNotLogin);
    app.get('/reg', function (req, res) {
        res.render('reg', {
            title: '注册',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/reg', checkNotLogin);
    app.post('/reg', function (req, res) {
        var name = req.body.name,
            password = req.body.password,
            password_re = req.body['password-repeat'];
        if (password_re != password) {
            req.flash('error', '<b>两次输入的密码不一致!</b>');
            return res.redirect('/reg');
        }
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');
        var newUser = new User({
            name: name,
            password: password,
            email: req.body.email
        });
        User.get(newUser.name, function (err, user) {
            if (user) {
                req.flash('error', '用户已存在!');
                return res.redirect('/reg');
            }
            newUser.save(function (err, user) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/reg');
                }
                req.session.user = user;
                req.flash('success', '注册成功!');
                res.redirect('/');
            });
        });
    });

    app.get('/login', checkNotLogin);
    app.get('/login', function (req, res) {
        res.render('login', {
            title: '登录',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    app.post('/login', checkNotLogin);
    app.post('/login', function (req, res) {
        var md5 = crypto.createHash('md5'),
            password = md5.update(req.body.password).digest('hex');

        User.get(req.body.name, function (err, user) {
            if (!user) {
                req.flash('error', '用户不存在!');
                return res.redirect('/login');
            }
            if (user.password != password) {
                req.flash('error', '密码错误!');
                return res.redirect('/login');
            }
            req.session.user = user;
            req.flash('success', '登陆成功!');
            res.redirect('/');
        });
    });

    app.get('/logout', checkLogin);
    app.get('/logout', function (req, res) {
        req.session.user = null;
        req.flash('success', '登出成功!');
        res.redirect('/');
    });
    app.get('/msg',function(req,res){

        //var FormData = require('form-data');
        var request = require('request');
        var querystring = require('querystring');

        var date = new Date();
        //存储各种时间格式，方便以后扩展
        var time = {
            year: date.getFullYear(),
            month: (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) :(date.getMonth() + 1),
            day: (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()),
            hours : (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()),
            minute : (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()),
            seconds : (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        };
        var stamp = ""+time.year + time.month + time.day + time.hours + time.minute + time.seconds;
        var md5 = crypto.createHash('md5'),
            SigParameter = md5.update("8a48b5514ee2497d014ee3394cda0288"+"3386a31a235e431fa8d49a281909d3f7"+stamp).digest('hex');

        var options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': new Buffer('8a48b5514ee2497d014ee3394cda0288:' + stamp).toString('base64')
            },
            url: 'https://sandboxapp.cloopen.com:8883/2013-12-26/Accounts/8a48b5514ee2497d014ee3394cda0288/SMS/TemplateSMS?sig='+SigParameter,
            method: 'POST',
            json:true,
            body: {to:"18628082771",appId:"8a48b5514ee2497d014ee33e2f610298",templateId:"1",datas:["8888","1xxx0"]}
        };
        function callback(error, response, data) {
            if (!error && response.statusCode == 200) {
                console.log('----info------',data);
            }
        }
        request(options, callback);
    });

    app.post('/msg', function (req, res) {
        console.info(req.body);
    });

    app.use(function (req, res) {
        res.render('404', {
            title: '404',
            user: req.session.user,
            success: req.flash('success').toString(),
            error: req.flash('error').toString()
        });
    });

    function checkLogin(req, res, next) {
         if (!req.session.user) {
         req.flash('error', '未登录!');
         return res.redirect('/login');  //一定要return 不然报错 “Can't set headers after they are sent.”
         }
        next();
    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录!');
            return res.redirect('back');
        }
        next();
    }
}



