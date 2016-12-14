/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,  // 注册
} from 'react-native';

var LoginView = require('./loginView');
var Plist = require('./pList');
var ListViewDemo = require('./listView');
var LishViewShare = require('./share');
var CarList = require('./carlist');
var Tab = require('./tab');
var New = require('./news');

class AHelloWorld extends Component {
    // 初始化方法 ---> viewDidLoad ---> 返回具体的组件内容
    // 写结构和内容
    render() {
        // 返回
        return (
            //<LoginView />
            //<Plist />

            //<ListViewDemo />
            //<LishViewShare />
            //<CarList />
            //<Tab />
            <New />
        );
    }
}



AppRegistry.registerComponent('AHelloWorld', () => AHelloWorld);
