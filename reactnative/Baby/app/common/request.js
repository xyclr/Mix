/**
 * Created by Alex on 16/12/16.
 */

var queryString = require('query-string');
var Mock = require('mockjs');
var _ = require('lodash');
var config = require('./config');

var request = {};

request.get = function(url, params){
    if(params) {
        url += '?' + queryString.stringify(params);
    }

    return fetch(url)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
        .catch((error) => {
            console.error(error);
        });
};

request.post = function(url, body){
    var options = _.extend(config.header, {
        body: JSON.stringify(body)
    });
    return fetch(url,options)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
        .catch((error) => {
            console.error(error);
        });
};

module.exports = request;