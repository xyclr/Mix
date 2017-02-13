/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Platform,
    ScrollView,
    AlertIOS
} from 'react-native';
import Button from 'react-native-button';
var {CountDownText} = require('react-native-sk-countdown');

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var request = require('../common/request');
var config = require('../common/config');

var Login = React.createClass({

    getInitialState(){
        return {
            phoneNumber: '',
            verifyCode: '',
            isSendVerifyCode: false
        }
    },

    _getVerifyCode(){
        var phoneNumber = this.state.phoneNumber
        if(!phoneNumber) {
            return AlertIOS.alert('手机号号码不能为空')
        }
        var url = config.addr.base + config.addr.signup;
        var body = {
            phoneNumber: phoneNumber
        };

        request.post(url, body)
        .then((data) => {
            if(data.success) {
                this.setState({
                    isSendVerifyCode: true
                })
            } else {
                AlertIOS.alert('获取手机验证码错误')
            }
        })
        .catch((error) => {
            AlertIOS.alert('获取手机验证码错误')
        })
    },

    _submit(){
        var phoneNumber = this.state.phoneNumber
        var verifyCode = this.state.verifyCode
        if(!phoneNumber || !verifyCode) {
            return AlertIOS.alert('手机号或验证码不能为空')
        }
        var url = config.addr.base + config.addr.verify;
        var body = {
            phoneNumber: phoneNumber,
            verifyCode: verifyCode
        };

        request.post(url, body)
            .then((data) => {

                if(data.success) {
                    this.props.loginAfterFn(data.data);
                } else {
                    AlertIOS.alert('登录失败')
                }
            })
            .catch((error) => {
                AlertIOS.alert('登录失败')
            })
    },

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>快速登录</Text>
                <View style={styles.loginBox}>
                    <TextInput
                        style={styles.loginBoxIpt}
                        onChangeText={(text) => this.setState({phoneNumber: text})}
                        placeholder='输入手机号码'
                        keyboardType="number-pad"
                        value={this.state.phoneNumber}
                    />

                    {
                        this.state.isSendVerifyCode
                            ?
                            <View style={styles.verifyBox}>
                                <TextInput
                                    style={[styles.loginBoxIpt, {flex: 2}]}
                                    onChangeText={(text) => this.setState({verifyCode: text})}
                                    placeholder='输入验证码'
                                    keyboardType="number-pad"
                                    value={this.state.verifyCode}
                                    />
                                <CountDownText
                                    style={styles.cd}
                                    countType='seconds' // 计时类型：seconds / date
                                    auto={true} // 自动开始
                                    afterEnd={() => this._getVerifyCode} // 结束回调
                                    timeLeft={10} // 正向计时 时间起点为0秒
                                    step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时
                                    startText='获取验证码' // 开始的文本
                                    endText='获取验证码' // 结束的文本
                                    intervalText={(sec) => sec + '秒重新获取'} // 定时的文本回调
                                    />
                            </View>
                            : null
                    }

                    {
                        !this.state.isSendVerifyCode
                            ?
                            <Button
                                containerStyle={styles.submitBtn}
                                onPress={this._getVerifyCode}
                                style={{fontSize: 20, color:'#ee753c'}}
                                >
                                获取验证码
                            </Button>
                            :
                            <Button
                                containerStyle={styles.submitBtn}
                                onPress={this._submit}
                                style={{fontSize: 20, color:'#ee753c'}}
                                >
                                登录
                            </Button>
                    }
                </View>
            </View>
        );
    },
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    },
    headerText: {
        marginTop:30,
        marginBottom:10,
        alignSelf: 'center',
        fontSize:18,

    },
    loginBox: {
        margin:10,
    },
    loginBoxIpt: {
        borderWidth: 0,
        height:40,
        lineHeight:40,
        backgroundColor: '#fff',
        borderRadius: 3,
        padding:5,
    },
    submitBtn:{
        width: width - 20,
        padding:12,
        marginTop:20,
        alignSelf:'center',
        borderWidth:1,
        borderColor:'#ee753c',
        borderRadius:5
    },
    verifyBox: {
        marginTop:2,
        flexDirection: 'row'
    },
    cd:{
        textAlign: 'center',
        color: 'white',
        padding:12,
        flex:1,
        backgroundColor:'#ee753c',
        marginLeft:5,
        borderRadius:3

    }

});

// 输出组件类
module.exports = Login;
