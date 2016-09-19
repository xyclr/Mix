/**
 * Created by JetBrains WebStorm.
 * User: chishaxie
 * Date: 12-1-5
 * Time: 下午4:59
 * To change this template use File | Settings | File Templates.
 */
var settings = require('./settings');

var conf = {
    Root : 'public', //文件的根路径
    IndexEnable : true, //开启目录功能？
    IndexFile : 'index.html', //目录欢迎文件
    DynamicExt : /^\.njs$/ig, //动态页面后缀（需要.）
    ServerName : 'httpNgin/nodeJS', //服务器名字
    FileCache : { //文件（内存）缓存
        MaxSingleSize : 1024*1024, //单个文件最大尺寸
        MaxTotalSize : 30*1024*1024 //整个文件Cache最大尺寸
    },
    Expires : { //浏览器缓存
        FileMatch : /gif|jpg|png|js|css|ico/ig, //匹配的文件格式
        MaxAge : 3600*24*365 //最大缓存时间
    },
    Compress : { //编码压缩
        FileMatch : /css|js|html/ig //匹配的文件格式
    },
    MIME : {
        'css': 'text/css',
        'gif': 'image/gif',
        'html': 'text/html',
        'ico': 'image/x-icon',
        'jpg': 'image/jpeg',
        'js': 'text/javascript',
        'png': 'image/png',
        'rar' : 'application/x-rar-compressed',
        'txt': 'text/plain',
        'jar': 'application/java-archive'
    }
};

/* 计算长度（中文算2个长度） */
String.prototype.len = function(){
    return this.replace(/[^\x00-\xff]/g,'**').length;
};

/* 填充（长度，字符串，填充到左边？） */
String.prototype.pad = function(len,char,isLeft){
    var bArr = len.toString(2).split('');
    var ret = '';
    var step = char;
    for(var i=bArr.length-1;i>=0;i--){
        if(bArr[i] == '1') ret += step;
        step += step;
    }
    if(!isLeft) return this + ret;
    else return ret + this;
};

/* 获取Http时间（2012-12-21 19:30形式） */
Date.prototype.getHttpTime = function(){
    return this.getFullYear() + '-' + (this.getMonth()+1) + '-' + this.getDate() +  ' ' + this.getHours() + ':' + this.getMinutes() ;
};

/* 缓存类（maxSize 最大字节数） */
function Cache(maxSize){
    this.maxSize = maxSize; //最大尺寸
    this.curSize = 0; //当前尺寸
    this._bufs = {}; //缓存Map
    this._accessCount = 0; //访问计数器
    this._lastClearCount = 0; //上次清理的计数器
}

Cache.prototype.put = function(key,buf){
    buf.access = this._accessCount++;
    var obuf = this._bufs[key];
    if(obuf) this.curSize -= obuf.length;
    this._bufs[key] = buf;
    this.curSize += buf.length;
    while(this.curSize > this.maxSize){
        this._clear();
    }
};

Cache.prototype.get = function (key) {
    var buf = this._bufs[key];
    if (buf) buf.access = this._accessCount++;
    return buf;
};

Cache.prototype.del = function (key) {
    var buf = this._bufs[key];
    if (buf) {
        this.curSize -= buf.length;
        delete this._bufs[key];
    }
};

Cache.prototype._clear = function () {
    var clearCount = (this._lastClearCount + this._accessCount) / 2;
    for (var e in this._bufs) {
        var buf = this._bufs[e];
        if (buf.access <= clearCount) {
            this.curSize -= buf.length;
            delete this._bufs[e];
        }
    }
    this._lastClearCount = clearCount;
};

/* HTTP缓存类（mtime不可更改） */
function HttpCache(mtime,obuf,gbuf,dbuf){
    this.mtime = mtime; //修改时间
    this.obuf = obuf; //原始数据
    this.gbuf = gbuf; //gzip数据
    this.dbuf = dbuf; //deflate数据
    this.length = (obuf?obuf.length:0) + (dbuf?dbuf.length:0) + (gbuf?gbuf.length:0);
}

/*
 HttpCache.prototype.setObuf = function(obuf){
 this.length += obuf.length - (this.obuf?this.obuf.length:0);
 this.obuf = obuf;
 };
 */

HttpCache.prototype.setGbuf = function(gbuf){
    this.length += gbuf.length - (this.gbuf?this.gbuf.length:0);
    this.gbuf = gbuf;
};

HttpCache.prototype.setDbuf = function(dbuf){
    this.length += dbuf.length - (this.dbuf?this.dbuf.length:0);
    this.dbuf = dbuf;
};

var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs'),
    zlib = require('zlib');

/* 路径状态查询（自带文件名封装） */
fs.statWithFN = function(dirpath,filename,callback){
    fs.stat(path.join(dirpath,filename),function(err,stats){
        callback(err,stats,filename);
    });
};

var Com = {
    fileCache : new Cache(conf.FileCache.MaxTotalSize),
    ifModifiedSince : 'If-Modified-Since'.toLowerCase(),
    parseRange : function(str,size){ //范围解析（HTTP Range字段）
        if(str.indexOf(",") != -1) //不支持多段请求
            return;
        var strs = str.split("=");
        str = strs[1] || '';
        var range = str.split("-"),
            start = parseInt(range[0], 10),
            end = parseInt(range[1], 10);
        // Case: -100
        if(isNaN(start)) {
            start = size - end;
            end = size - 1;
        }
        // Case: 100-
        else if(isNaN(end)) {
            end = size - 1;
        }
        // Invalid
        if(isNaN(start) || isNaN(end) || start > end || end > size)
            return;
        return {start: start, end: end};
    },
    error : function(response,id,err){ //返回错误
        response.writeHeader(id, {'Content-Type': 'text/html'});
        var txt;
        switch(id){
            case 404:
                txt = '<h3>404: Not Found</h3>';
                break;
            case 403:
                txt = '<h3>403: Forbidden</h3>';
                break;
            case 416:
                txt = '<h3>416: Requested Range not satisfiable</h3>';
                break;
            case 500:
                txt = '<h3>500: Internal Server Error</h3>';
                break;
        }
        if(err) txt += err;
        response.end(txt);
    },
    cache : function(response,lastModified,ext){ //写客户端Cache
        response.setHeader('Last-Modified', lastModified);
        if(ext && ext.search(conf.Expires.FileMatch)!=-1){
            var expires = new Date();
            expires.setTime(expires.getTime() + conf.Expires.MaxAge * 1000);
            response.setHeader('Expires', expires.toUTCString());
            response.setHeader('Cache-Control', 'max-age=' + conf.Expires.MaxAge);
        }
    },
    compressHandle : function(request,response,raw,ext,contentType,statusCode){ //流压缩处理
        var stream = raw;
        var acceptEncoding = request.headers['accept-encoding'] || '';
        var matched = ext.match(conf.Compress.match);
        if (matched && acceptEncoding.match(/\bgzip\b/)) {
            response.setHeader('Content-Encoding', 'gzip');
            stream = raw.pipe(zlib.createGzip());
        } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
            response.setHeader('Content-Encoding', 'deflate');
            stream = raw.pipe(zlib.createDeflate());
        }
        response.setHeader('Content-Type', contentType);
        response.writeHead(statusCode);
        stream.pipe(response);
    },
    flush : function(request,response,cache,ext,contentType){ //Cache输出
        var acceptEncoding = request.headers['accept-encoding'] || "";
        var matched = ext.match(conf.Compress.FileMatch);
        if (matched && acceptEncoding.match(/\bgzip\b/)) {
            if(cache.gbuf){
                response.writeHead(200, {'Content-Encoding': 'gzip','Content-Type': contentType});
                response.end(cache.gbuf);
            }
            else{
                zlib.gzip(cache.obuf,function(err,buf){
                    if(err) Com.error(response,500,'<h4>Error : ' + err + '</h4>');
                    else{
                        response.writeHead(200, {'Content-Encoding': 'gzip','Content-Type': contentType});
                        response.end(buf);
                        cache.setGbuf(buf);
                    }
                });
            }
        } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
            if(cache.dbuf){
                response.writeHead(200, {'Content-Encoding': 'deflate','Content-Type': contentType});
                response.end(cache.dbuf);
            }
            else{
                zlib.deflate(cache.obuf,function(err,buf){
                    if(err) Com.error(response,500,'<h4>Error : ' + err + '</h4>');
                    else{
                        response.writeHead(200, {'Content-Encoding': 'deflate','Content-Type': contentType});
                        response.end(buf);
                        cache.setDbuf(buf);
                    }
                });
            }
        } else {
            response.writeHead(200,{'Content-Type': contentType});
            response.end(cache.obuf);
        }
    },
    pathHandle : function(request,response,realpath,httppath,dirmtime){
        fs.stat(realpath,function(err,stats){
            if(err){
                if(dirmtime){
                    var dirPath = path.dirname(realpath);
                    fs.readdir(dirPath,function(err,files){
                        if(err) {
                            Com.error(response,404)
                        } else
                        {
                            var httpP = httppath.replace(/\\/g,'/');
                            var txt = '<!DOCTYPE html> <html> <head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>INSPINIA | Dashboard</title> <link href="/css/bootstrap.min.css" rel="stylesheet"> <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"> <link href="/css/animate.css" rel="stylesheet"> <link href="/css/style.css" rel="stylesheet"> <style> body { background: #fff } h5 { font-size: 16px; color: #000; } .file-list li { width: 100%; overflow: hidden; font-size: 14px; margin: 2px 0; display: table; } .file-list li a { display: block; color: #333; width: 250px; margin-right: 50px; overflow: hidden; word-wrap: normal; white-space: nowrap; text-overflow: ellipsis; } .file-list li a:hover { color: #337ab7; text-decoration: none; } .file-list li span { color: #999; margin-right: 30px; display: table-cell; width: 150px; } .file-list li span.cke { width: 20px;padding:0 10px 0 20px; } .file-list li span.cke input { vertical-align: -2px; } .btn-box { color: #000; visibility: hidden; } .file-list li:hover,.file-list.hover{ background:#eee; } .file-list li:hover .btn-box,.file-list.hover .btn-box { visibility: visible; } .file-list li.isfile .btn-box {visibility: hidden!important; }.btn-box { padding-left:20px; } .btn-box span { cursor: pointer; } .btn-box span i { margin-right:5px; } .btn-box span:hover { color: #337ab7; } </style> </head> <body> <!--list--> <div id="FileBrowser"> <div class="ibox-title"> <div class="row"> <div class="col-lg-3"> <h5>root<span id="filepath">'+httpP+'';
                            if(httpP =='/' || httpP =='/uploads' || httpP =='/uploads/') {
                                txt += '</span></h5></div> <div class="col-lg-9"> <div class="ibox-tools-btn"> <a class="btn btn-primary btn-xs" href="javascript:void(0)"> <i class="fa fa-reply"></i> Back </a> ';
                            }else {
                                txt += '</span></h5></div> <div class="col-lg-9"> <div class="ibox-tools-btn"> <a class="btn btn-primary btn-xs" href="'+path.dirname(httppath).replace(/\\/g,'/')+'"> <i class="fa fa-reply"></i> Back </a> ';
                            }
                            txt += '<a class="btn btn-primary btn-xs" id="refresh"> <i class="fa fa-refresh btn-xs"></i> Refresh</a> <a class="btn btn-primary btn-xs" data-toggle="modal" data-target="#fileUpload"> <i class="fa fa-upload"></i> Upload File </a> <a class="btn btn-primary btn-xs" id="btn-select-all"> Select All </a> <a class="btn btn-primary btn-xs" id="btn-select-cancel"> Cancel Select </a> <a class="btn btn-warning btn-xs" id="btn-file-del"> <i class="fa fa-trash-o"></i> Del Select </a> </div> </div> </div> </div> <div class="ibox-content" style="overflow: hidden" path="uploads"> <ul class="file-list" style="padding:0;">';

                            if (files.length == 0) {
                                txt += '</ul> <p style="text-align:center;padding: 100px 0;"><i class="fa fa-frown-o" style=" font-size: 50px; vertical-align: middle; "></i> 木有文件啊！</p>';
                                txt += '</div> </div>';
                                txt += '<div class="modal  fade  " id="fileUpload" tabindex="-1" role="dialog" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> <h4 class="modal-title">File Upload</h4> </div> <form role="form" action="/upload" method="post" id="fileUploadForm" enctype="multipart/form-data" target="hidden_frame"><input type="hidden" name="path" /> <div class="modal-body"> </div> <div class="modal-footer"> <button type="button" class="btn btn-white" data-dismiss="modal">Close</button> <input type="submit" class="btn btn-primary" id="file_upload" value="Upload"/> </div> <iframe name="hidden_frame" id="hidden_frame" style="display:none"></iframe>  </form> </div> </div> </div><script src="/js/jquery-2.1.1.js"></script> <script src="/js/bootstrap.min.js"></script> <script src="/js/common.js"></script><script src="/js/file.js"></script></body></html>';
                                var cache = new HttpCache(dirmtime.getTime(),new Buffer(txt));
                                // Com.cache(response,dirmtime.toUTCString(),'html');//cached
                                Com.flush(request,response,cache,'html','text/html');
                                Com.fileCache.put(dirPath+'\\',cache);
                                return;
                            }
                            var fileI = 0;
                            var fileInfos = [];
                            var fsCallback = function(err,stats,filename){
                                if(!err) fileInfos.push([stats,filename]);
                                fileI++;
                                if(fileI == files.length){
                                    fileInfos.sort(function(a,b){
                                        if(a[0].isDirectory() == b[0].isDirectory())
                                            return a[1].localeCompare(b[1]);
                                        return b[0].isDirectory() - a[0].isDirectory();
                                    });
                                    for(var i=0;i<fileInfos.length;i++){
                                        if(fileInfos[i][0].isDirectory()) fileInfos[i][1] += '/';
                                        var sf = fileInfos[i][1];
                                        var st = fileInfos[i][0].mtime.getHttpTime();
                                        var isFile = fileInfos[i][0].isDirectory();
                                        var ss = isFile?'File':parseInt(fileInfos[i][0].size.toString()/1024) + "kb";
                                        var ext = fileInfos[i][1].split(".").pop();
                                        if(fileInfos[i][0].isDirectory()) {
                                            type = "fa fa-folder-o";
                                        } else if(/(jpg|png|gif|jpeg)$/i.test(ext)) {
                                            type= "fa fa-picture-o";
                                            console.info("jpg")
                                        } else if (/(mp4|rmvb|mkv|avi|flv)$/i.test(ext)) {
                                            type= "fa fa-file-video-o";
                                        } else if (/(mp3|wav|wma|ogg|ape|acc)$/i.test(ext)) {
                                            type= "fa fa-file-audio-o";
                                        } else {
                                            type = "fa fa-file-o";
                                        };
                                        if(isFile) {
                                            txt += '<li path="'+ settings.stServer + path.join(httppath,sf).replace(/\\/g,'/')+'" class="isfile"><span class="cke"><input type="checkbox" disabled /></span><a href="'+path.join(httppath,sf).replace(/\\/g,'/')+'"  class="name"><i class="' + type + '"></i> '+sf+'</a><span class="time">'+st+'</span><span class="size">'+ss+'</span><span class="btn-box"><span class="btn-view"><i class="fa fa-eye"></i>view</span><span class="btn-select"><i class="fa fa-check-circle"></i>select</span></span></li>';
                                        } else {
                                            txt += '<li path="'+ settings.stServer + path.join(httppath,sf).replace(/\\/g,'/')+'" ><span class="cke"><input type="checkbox" name="checkbox"/></span><a href="'+path.join(httppath,sf).replace(/\\/g,'/')+'"  class="name" target="_blank"><i class="' + type + '"></i> '+sf+'</a><span class="time">'+st+'</span><span class="size">'+ss+'</span><span class="btn-box"><span class="btn-view"><i class="fa fa-eye"></i>view</span><span class="btn-select"><i class="fa fa-check-circle"></i>select</span></span></li>';
                                        }

                                    }
                                    txt += '</ul> </div> </div>';
                                    //model
                                    txt += '<div class="modal  fade  " id="fileUpload" tabindex="-1" role="dialog" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> <h4 class="modal-title">File Upload</h4> </div> <form role="form" action="' + settings.Server +'/upload" method="post" id="fileUploadForm" enctype="multipart/form-data" target="hidden_frame"><input type="hidden" name="path" /> <div class="modal-body"> </div> <div class="modal-footer"> <button type="button" class="btn btn-white" data-dismiss="modal">Close</button> <input type="submit" class="btn btn-primary" id="file_upload" value="Upload"/> </div> <iframe name="hidden_frame" id="hidden_frame" style="display:none"></iframe>  </form> </div> </div> </div><script src="/js/jquery-2.1.1.js"></script> <script src="/js/bootstrap.min.js"></script> <script src="/js/common.js"></script><script src="/js/file.js"></script></body></html>';
                                    var cache = new HttpCache(dirmtime.getTime(),new Buffer(txt));
                                   // Com.cache(response,dirmtime.toUTCString(),'html');//cached
                                    Com.flush(request,response,cache,'html','text/html');
                                    Com.fileCache.put(dirPath+'\\',cache);
                                }
                            };
                            for(var i=0;i<files.length;i++)
                                fs.statWithFN(dirPath,files[i],fsCallback);
                        }
                    });
                }
                else{
                    Com.fileCache.del(realpath);
                    Com.error(response,404);
                }
            }
            else{
                var lastModified = stats.mtime.toUTCString();
                //304 客户端有Cache，且木有改动
                if(request.headers[Com.ifModifiedSince] && lastModified == request.headers[Com.ifModifiedSince]){
                    response.writeHead(304);
                    response.end();
                    return;
                }
                var ext = path.extname(realpath);
                ext = ext?ext.slice(1):'unknown';
                ext = stats.isDirectory()?'html':ext;
                var contentType = conf.MIME[ext];
                var cache = Com.fileCache.get(realpath);
                //服务端有Cache，且木有改动
                if(cache && cache.mtime == stats.mtime.getTime()){
                    Com.cache(response,lastModified,ext);
                    Com.flush(request,response,cache,ext,contentType);
                    Com.fileCache.put(realpath,cache);
                    return;
                }
                if(stats.isDirectory()){
                    realpath = path.join(realpath,conf.IndexFile);
                    Com.pathHandle(request,response,realpath,httppath,conf.IndexEnable?stats.mtime:0);
                }
                else{
                    //不合法的MIME
                    if(!contentType){
                        Com.error(response,403);
                        return;
                    }
                    Com.cache(response,lastModified,ext);
                    //文件太大，服务端不Cache
                    if(stats.size > conf.FileCache.MaxSingleSize){
                        if(request.headers['range']){
                            var range = Com.parseRange(request.headers['range'], stats.size);
                            if(range){
                                response.setHeader('Content-Range', 'bytes ' + range.start + '-' + range.end + '/' + stats.size);
                                response.setHeader('Content-Length', (range.end - range.start + 1));
                                var raw = fs.createReadStream(realpath, {'start': range.start, 'end': range.end});
                                Com.compressHandle(request,response,raw,ext,contentType,206);
                            }
                            else
                                Com.error(response,416);
                        }
                        else{
                            var raw = fs.createReadStream(realpath);
                            Com.compressHandle(request,response,raw,ext,contentType,200);
                        }
                    }
                    else{
                        fs.readFile(realpath,function(err,data){
                            if(err) Com.error(response,500,'<h4>Error : ' + err + '</h4>');
                            else{
                                var buf = new HttpCache(stats.mtime.getTime(),data);
                                Com.flush(request,response,buf,ext,contentType);
                                Com.fileCache.put(realpath,buf);
                            }
                        });
                    }
                }
            }
        });
    }
};

/* 对外的接口 */
var createServer = function(port,dynamicCallBack){
    if(!port) port = 8080;
    http.createServer(function(req,res){
        if(conf.ServerName) res.setHeader('Server',conf.ServerName);
        var httppath = '/';
        try{
            httppath = path.normalize(decodeURI(url.parse(req.url).pathname.replace(/\.\./g, '')));
        }
        catch(err){
            httppath = path.normalize(url.parse(req.url).pathname.replace(/\.\./g, ''));
        }
        var realpath = path.join(conf.Root, httppath );
        var ext = path.extname(realpath);
        if(ext.search(conf.DynamicExt) != -1){
            if(typeof dynamicCallBack === 'function')
                dynamicCallBack(req,res,httppath,realpath);
            else
                Com.error(res,500,"<h4>Error : Can't find the dynamic page callback function!</h4>");
        }
        else
            Com.pathHandle(req,res,realpath,httppath);
    }).listen(port);
};
createServer(3030,function(){
    //console.info("static Server start!")
})