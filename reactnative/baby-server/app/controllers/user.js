/**
 * Created by Alex on 16/12/31.
 */
'use strict'

var xss = require('xss')
var mongoose = require('mongoose')
var User = mongoose.model('User')
var uuid = require('uuid')
var sms = require('../service/sms')


exports.signup = function *(next) {
    var phoneNumber = xss(this.request.body.phoneNumber.trim())
    console.log(this.request.body)
    var user = yield User.findOne({
        phoneNumber: phoneNumber
    }).exec()

    var verifyCode = sms.getCode()

    if (!user) {
        var accessToken = uuid.v4()

        user = new User({
            nickname: '小狗宝',
            avatar: 'http://res.cloudinary.com/gougou/image/upload/mooc1.png',
            phoneNumber: xss(phoneNumber),
            verifyCode: verifyCode,
            accessToken: accessToken
        })
    }
    else {
        user.verifyCode = verifyCode
    }

    try {
        user = yield user.save()
    }
    catch (e) {
        this.body = {
            success: false
        }

        return next
    }

    var msg = '您的注册验证码是：' + user.verifyCode


    console.log(user)
    //
    //try {
    //    sms.send(user.phoneNumber, msg)
    //}
    //catch (e) {
    //    console.log(e)
    //
    //    this.body = {
    //        success: false,
    //        err: '短信服务异常'
    //    }
    //
    //    return next
    //}

    this.body = {
        success: true
    }
}

exports.verify = function *(next) {
    var verifyCode = this.request.body.verifyCode
    var phoneNumber = this.request.body.phoneNumber

    if (!verifyCode || !phoneNumber) {
        this.body = {
            success: false,
            err: '验证没通过'
        }

        return next
    }

    var user = yield User.findOne({
        phoneNumber: phoneNumber,
        verifyCode: verifyCode
    }).exec()

    if (user) {
        user.verified = true
        user = yield user.save()

        console.log({
            nickname: user.nickname,
            accessToken: user.accessToken,
            avatar: user.avatar,
            _id: user._id
        })
        this.body = {
            success: true,
            data: {
                nickname: user.nickname,
                accessToken: user.accessToken,
                avatar: user.avatar,
                _id: user._id
            }
        }
    }
    else {
        this.body = {
            success: false,
            err: '验证未通过'
        }
    }
}

exports.update = function *(next) {
    var body = this.request.body
    var user = this.session.user

    console.log(body)
    var fields = 'avatar,gender,age,nickname,breed'.split(',')

    fields.forEach(function(field) {
        if (body[field]) {
            user[field] = xss(body[field].trim())
        }
    })

    user = yield user.save()

    this.body = {
        success: true,
        data: {
            nickname: user.nickname,
            accessToken: user.accessToken,
            avatar: user.avatar,
            age: user.age,
            gender: user.gender,
            _id: user._id
        }
    }
}