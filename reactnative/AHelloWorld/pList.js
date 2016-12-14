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
var col = 3;
var boxW = 100;
var vMargin = 20;
var hMargin = (width - boxW*3) / (col + 1)

class Plist extends Component {
    render() {
        return (
            <View style={styles.container}>
                {this.renderAll()}
            </View>
        );
    }

    renderAll() {
        var allBags = [];
        var BagsData = {
            data: [
                {
                    icon: 'icon',
                    title: '包1'
                },
                {
                    icon: 'icon8',
                    title: '包2'
                },
                {
                    icon: 'icon',
                    title: '包3'
                },
                {
                    icon: 'icon',
                    title: '包4'
                },
                {
                    icon: 'icon8',
                    title: '包2'
                },
                {
                    icon: 'icon',
                    title: '包3'
                },
                {
                    icon: 'icon',
                    title: '包4'
                }
            ]
        };
        for (var i = 0; i < BagsData.data.length; i++) {
            var bag = BagsData.data[i];
            var url = './img/' + bag.icon + '.png';
            allBags.push(
                <View key={i} style={styles.outerStyle}>
                    <Image source={{uri:url}} style={styles.imgStyle}/>
                    <Text style={styles.nameStyle}>{bag.title}</Text>
                </View>
            )
        }
        return allBags
    }
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#ddd',
        flexDirection: 'row',
        marginTop: 25,
        //alignItems: 'center',
        //justifyContent: 'center',
        flexWrap: 'wrap'
    },
    outerStyle: {
        alignItems: 'center',
        width:width*0.3,
        marginLeft: width*0.025,
        marginTop: vMargin,
        backgroundColor:'red'

    },
    imgStyle: {
        width: width*0.3,
        height: width*0.3,
    },
    nameStyle: {}
});

module.exports = Plist;
