/**
 * Created by Alex on 17/1/10.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder
} from 'react-native';
import PubSub from 'pubsub-js'
import Util from '../common/util'
export default class CenterItem extends Component {
  constructor(props) {
    super(props);

    var size = 80
    var left = Util.size.width /2 - size/2
    var top = Util.size.height /2 - size/2

    this.state = {
      size: size,
      position: {
        previousLeft: left,
        previousTop: top,
        lastLeft: left,
        lastTop: top
      },
      style: {
        width: size,
        height: size,
        borderRadius: size/2,
        top: top,
        left: left
      }
    }

    this.onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this);
    this.onMoveShouldSetPanResponder = this.onMoveShouldSetPanResponder.bind(this);
    this.onPanResponderGrant = this.onPanResponderGrant.bind(this);
    this.onPanResponderMove = this.onPanResponderMove.bind(this);
    this.onPanResponderEnd = this.onPanResponderEnd.bind(this);
  }

  //用户开始触摸屏幕的时候，是否愿意成为响应者；
  onStartShouldSetPanResponder(evt, gestureState) {
    console.log('onStartShouldSetPanResponder')
    return true;
  }

  //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
  onMoveShouldSetPanResponder(evt, gestureState) {
    console.log('onMoveShouldSetPanResponder')
    return true;
  }

  // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
  onPanResponderGrant(evt, gestureState) {
    console.log('onPanResponderGrant...');
    this.setState({
      style: {
        width: this.state.size,
        height: this.state.size,
        borderRadius: this.state.size,
        left: this.state.position.previousLeft,
        top: this.state.position.previousTop,
      }
    });
  }

  // 最近一次的移动距离为gestureState.move{X,Y}
  onPanResponderMove(evt, gestureState) {
    this.state.position.previousLeft = this.state.position.lastLeft + gestureState.dx;
    this.state.position.previousTop = this.state.position.lastTop + gestureState.dy;
    PubSub.publish('SceneCtrl.centerPosition', this.state.position);
    //实时更新
    this.setState({
      style: {
        width: this.state.size,
        height: this.state.size,
        borderRadius: this.state.size,
        left: this.state.position.previousLeft,
        top: this.state.position.previousTop,
      }
    });
  }


  // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
  // 一般来说这意味着一个手势操作已经成功完成。
  onPanResponderEnd(evt, gestureState) {
    this.state.position.lastLeft = this.state.position.previousLeft;
    this.state.position.lastTop = this.state.position.previousTop;
  }

  onPanResponderTerminate(evt, gestureState) {
    // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    console.log('onPanResponderTerminate')
    return true
  }

  componentWillMount(evt, gestureState) {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderEnd,
      onPanResponderTerminate: this.onPanResponderEnd,
      onPanResponderTerminate: this.onPanResponderTerminate,
    });
  }

  render() {
    return (
      <View
        {...this._panResponder.panHandlers}
        style={[styles.circle,this.state.style]}>
        <View style={styles.innerCircle}></View>
      </View>);
  }
}

var styles = StyleSheet.create({
  circle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:'rgb(255,255,255)',
  }
});