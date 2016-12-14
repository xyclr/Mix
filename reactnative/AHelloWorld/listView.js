

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    ListView,
    TouchableOpacity
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Wine = require('./Wine.json')

var ListViewDemo = React.createClass({
    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
        return{
            dataSource: ds.cloneWithRows(Wine)
        }
    },

    render(){
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                contentContainerStyle={styles.listViewStyle}
            />
        )
    },

    renderRow(rowData){
        return(
            <TouchableOpacity>
            <View style={styles.celViewStyle}>
                <Image source={{uri:rowData.image}} style={styles.thumb} />
                <View style={styles.rViewStyle}>
                    <Text style={styles.mt}>{rowData.name}</Text>
                    <Text style={styles.md}>${rowData.money}</Text>
                </View>
            </View>
            </TouchableOpacity>
        )
    }
});

const styles = StyleSheet.create({
   listViewStyle: {
   },
   thumb: {
        width:60,
        height:60,
        marginRight: 10
   },
   mt: {
        fontSize: 15,
        width: width - 90,
        marginBottom: 5
   },
   md: {
        fontSize:  18,
        color: 'blue'
   },
   celViewStyle: {
        padding: 10,
        borderBottomWidth: 0.2,
        borderBottomColor: '#e8e8e8',
        flexDirection:'row'
   },
   rViewStyle: {
        justifyContent: 'center',
   }
});

module.exports = ListViewDemo;
