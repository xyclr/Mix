import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native';
var Sound = require('react-native-sound');


const CIRCLE_SIZE = 80;

import Util from './Util';
export default class MainView extends Component {
  constructor(props) {
    super(props);
    var s = new Sound(this.props.path, Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        s.play();
        console.log('duration', s.getDuration());
      }
    });
    this.state = {
      soundIns: s,
      position: {
        previousLeft: 0,
        previousTop: 0,
        lastLeft: 0,
        lastTop: 0,
      }
    };

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
        backgroundColor: 'red',
        left: this.state.position.previousLeft,
        top: this.state.position.previousTop,
      }
    });
  }

  // 最近一次的移动距离为gestureState.move{X,Y}
  onPanResponderMove(evt, gestureState) {
    console.log(this.state.position);
    this.state.position.previousLeft = this.state.position.lastLeft + gestureState.dx;
    this.state.position.previousTop = this.state.position.lastTop + gestureState.dy;

    //if (this.state.position.previousLeft <= 0) {
    //  this.state.position.previousLeft = 0;
    //}
    //if (this.state.position.previousTop <= 0) {
    //  this.state.position.previousTop = 0;
    //}
    //if (this.state.position.previousLeft >= Util.size.width - CIRCLE_SIZE) {
    //  this.state.position.previousLeft = Util.size.width - CIRCLE_SIZE;
    //}
    //if (this.state.position.previousTop >= Util.size.height - CIRCLE_SIZE) {
    //  this.state.position.previousTop = Util.size.height - CIRCLE_SIZE;
    //}

    //实时更新
    this.setState({
      style: {
        backgroundColor: 'red',
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

    //this.changePosition();
  }

  /**
   根据位置做出相应处理
   **/
  changePosition() {

    if (_previousLeft + CIRCLE_SIZE / 2 <= Util.size.width / 2) {
      //left
      _previousLeft = lastLeft = 0;

      this.setState({
        style: {
          left: _previousLeft,
          top: _previousTop,
        }
      });
    } else {
      _previousLeft = lastLeft = Util.size.width - CIRCLE_SIZE;

      this.setState({
        style: {
          left: _previousLeft,
          top: _previousTop,
        }
      });
    }
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

  onPanResponderTerminate(evt, gestureState) {
  // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    console.log('onPanResponderTerminate')
    return true
  }


//<TouchableOpacity onPress={this._playSound.bind(this)} style={styles.item}>
//<Text style={styles.button}>play</Text>
//</TouchableOpacity>
//<TouchableOpacity onPress={this._stopSound.bind(this)} style={styles.item}>
//<Text style={styles.button}>stop</Text>
//</TouchableOpacity>
//<TouchableOpacity onPress={this._setCurrentTime.bind(this)} style={styles.item}>
//  <Text style={styles.button}>setCurrentTime</Text>
//</TouchableOpacity>
//<TouchableOpacity onPress={this._pause.bind(this)} style={styles.item}>
//<Text style={styles.button}>_pause</Text>
//</TouchableOpacity>

  render() {
    return (
      <View style={styles.container}>


        <View
          {...this._panResponder.panHandlers}
          style={[styles.circle,this.state.style]}>


        </View>

      </View>);
  }


  componentDidMount() {
    //console.log(this.props)
    //soundIns = new Sound('test.mp3', Sound.MAIN_BUNDLE, (e) => {
    //  if (e) {
    //    console.log('error', e);
    //  } else {
    //    console.log('duration', soundIns.getDuration());
    //  }
    //});
  }

  _playSound() {
    console.log(this.state)
    this.state.soundIns.play()
  }

  _stopSound() {
    this.state.soundIns.stop()
  }

  _setCurrentTime() {
    this.state.soundIns.setCurrentTime(12.5)
  }

  _pause() {
    this.state.soundIns.pause()
  }

  _stop() {
    this.state.soundIns._stop()
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    fontSize: 20,
    backgroundColor: 'silver',
    padding: 5,
    borderRightWidth: 1,
    borderRightColor: '#fff'
  },
  draggableContainer: {
    //position    : 'absolute',
    backgroundColor: 'red'
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'blue',
    position: 'absolute',
  }
});

