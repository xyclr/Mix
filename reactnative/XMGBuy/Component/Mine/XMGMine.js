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
    ScrollView
} from 'react-native';

// 导入外部的组件
var MyCell = require('./XMGCommonMyCell');
var MineMiddleView = require('./XMGMineMiddleView');
var HeaderView = require('./XMGMineHeaderView');

var Mine = React.createClass({
    render() {
        return (
           <ScrollView
               style={styles.scrollViewStyle}
               contentInset = {{top: -200}}
               contentOffset = {{y:200}}
           >
               {/*头部的View*/}
               <HeaderView />

               <View>
                   <MyCell
                       leftIconName="collect"
                       leftTitle="我的订单"
                       rightTitle="查看全部订单"
                   />
                   <MineMiddleView />
               </View>

               <View style={{marginTop:20}}>
                   <MyCell
                       leftIconName="draft"
                       leftTitle="小码哥钱包"
                       rightTitle="账户余额:¥100"
                   />

                   <MyCell
                       leftIconName="like"
                       leftTitle="抵用券"
                       rightTitle="10张"
                   />
               </View>


               <View style={{marginTop:20}}>
                   <MyCell
                       leftIconName="card"
                       leftTitle="积分商城"
                   />
               </View>

               <View style={{marginTop:20}}>
                   <MyCell
                       leftIconName="new_friend"
                       leftTitle="今日推荐"
                       rightIconName="me_new"
                   />
               </View>

               <View style={{marginTop:20}}>
                   <MyCell
                       leftIconName="pay"
                       leftTitle="我要合作"
                       rightTitle="轻松开店,招财进宝"
                   />
               </View>
           </ScrollView>
        );
    }
});


const styles = StyleSheet.create({
    scrollViewStyle:{
        backgroundColor:'#e8e8e8'
    }
});

// 输出组件类
module.exports = Mine;
