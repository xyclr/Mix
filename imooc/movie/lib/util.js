/**
 * Created by Alex on 16/9/10.
 */
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

exports.writeFileAsnyc = function(fpath, content){
    return new Promise(function(resolve, reject){
        fs.writeFile(fpath, content, function(err){
            if(err) reject(err)
            else resolve()
        })
    })
};

