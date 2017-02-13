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
    ScrollView
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');


var Recording = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <Text>recording</Text>
            </View>
        );
    },
});


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5fc55'
    }
});

// 输出组件类
module.exports = Recording;
