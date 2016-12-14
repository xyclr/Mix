/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

class LoginView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./img/icon.png')} style={styles.iconStyle} />
                <TextInput placeholder={'请输入用户名'} style={styles.textIptStyle} />
                <TextInput placeholder={'请输入密码'} style={styles.textIptStyle} password={true} />
                <View style={styles.loginBtn}>
                    <Text style={{color:'white'}}>登录</Text>
                </View>
                <View style={styles.settingsStyle}>
                    <Text>设置</Text>
                    <Text>新用户</Text>
                </View>
                <View style={styles.otherStyle}>
                    <Text>其他登录方式:</Text>
                    <Image source={require('./img/icon3.png')} style={styles.iconLoginStyle} />
                    <Image source={require('./img/icon7.png')} style={styles.iconLoginStyle} />
                    <Image source={require('./img/icon8.png')} style={styles.iconLoginStyle} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd',
        //flexDirection: 'row',
        height: 100,
        marginTop: 25,
        alignItems: 'center',
        //justifyContent: 'center'
    },
    iconStyle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
        marginTop:50,
        marginBottom:30
    },
    textIptStyle: {
        height: 38,
        backgroundColor: 'white',
        marginBottom:1,
        textAlign: 'center'
    },
    loginBtn: {
        height:35,
        backgroundColor: 'blue',
        width:width*0.9,
        marginTop:30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:8
    },
    settingsStyle: {
        flexDirection: 'row',
        width:width*0.9,
        justifyContent:'space-between',
        marginTop:10
    },
    otherStyle: {
        flexDirection:'row',
        alignItems: 'center',
        position:'absolute',
        bottom:10,
        left:width*0.05,
    },
    iconLoginStyle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft:5,
    }
});

module.exports = LoginView;
