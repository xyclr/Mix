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
    TabBarIOS,
    Navigator,
    AsyncStorage
} from 'react-native';


var Icon = require('react-native-vector-icons/FontAwesome');
var Video = require('../video/index');
var Recording = require('../recording/index');
var Account = require('../acount/index');
var Login = require('../acount/login');

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var Main = React.createClass({
    statics: {
        title: '<TabBarIOS>',
        description: 'Tab-based navigation.',
    },

    displayName: 'TabBarExample',

    getInitialState: function () {
        return {
            selectedTab: 'account',
            isLogined: false
        };
    },

    _loginAfterFn(data){
        var user = ''
        if(data) {
            user = JSON.stringify(data)
        }

        AsyncStorage.setItem('user', user)
            .then(() => {
                this.setState({
                    isLogined: true,
                    user: data
                })
            })
    },

    _loginOut(){
        AsyncStorage.removeItem('user')
        this.setState({
            isLogined: false,
            user: null
        })
    },

    _asyncAppStatus(){
        AsyncStorage.getItem('user')
            .then((data) => {
                var user =''
                var newState = {}
                if(data) {
                    user = JSON.parse(data)
                }
                if(data) {
                    newState = {
                        isLogined: true,
                        user: user,
                    }
                } else {
                    newState = {
                        isLogined: false,
                        user: user
                    }
                }
                this.setState(newState)
            })
    },

    componentDidMount(){
        this._asyncAppStatus();
    },

    render: function () {
        if(!this.state.isLogined) {
            return (
                <Login loginAfterFn={this._loginAfterFn} />
            )
        }
        return (
            <TabBarIOS
                tintColor="white"
                barTintColor="#333333"
                style={styles.tabNav}
                >
                <Icon.TabBarItem

                    iconName="video-camera"
                    selected={this.state.selectedTab === 'video'}
                    onPress={() => {this.setState({selectedTab: 'video'});}}>
                    <Navigator
                        initialRoute={{name: 'video', component: Video}}
                        renderScene={(route, navigator) => {
                            var Component = route.component;
                            return <Component {...route.params} navigator={navigator} />
                        }}
                        />
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName="plus-circle"
                    selected={this.state.selectedTab === 'recording'}
                    onPress={() => {this.setState({selectedTab: 'recording'});}}>
                    <Recording></Recording>
                </Icon.TabBarItem>
                <Icon.TabBarItem
                    iconName="user"
                    selected={this.state.selectedTab === 'account'}
                    onPress={() => {this.setState({selectedTab: 'account'});}}>
                    <Account user={this.state.user} loginOut={this._loginOut}></Account>
                </Icon.TabBarItem>
            </TabBarIOS>
        );
    },
});

var styles = StyleSheet.create({
    tabNav: {}
});


// 输出组件类
module.exports = Main;
