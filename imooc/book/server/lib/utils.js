'use strict'

var fs = require('fs');
var Promise = require('bluebird');

exports.readFileAsnyc = function(fpath, encoding){
    return new Promise(function(resolve, reject){
        fs.readFile(fpath, encoding, function(err, content){
            if(err) reject(err)
            else resolve(content)
        })
    })
};

exports.writeFileAsnyc = function(fpath, content, encoding){
    encoding = encoding || 'utf-8';
    return new Promise(function(resolve, reject){
        fs.writeFile(fpath, content, function(err){
            if(err) reject(err)
            else resolve(content)
        }, encoding)
    })
};

exports.mkdir = function(path){
    return new Promise(function(resolve, reject){
        if(!fs.existsSync(path)) {
            fs.mkdir(path, '0777', function(err){
                if(err){
                    reject(err)
                }else{
                    console.log("creat done!");
                    resolve();
                }
            })
        } else {
            resolve();
        }

    })
}
