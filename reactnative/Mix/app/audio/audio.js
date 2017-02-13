import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
  Image
} from 'react-native';
import PubSub from 'pubsub-js'
import Util from '../common/util';
import Sound from 'react-native-sound';

const CIRCLE_SIZE = 80;
export default class MainView extends Component {
  constructor(props) {
    super(props);
    var s = new Sound(this.props.path, Sound.MAIN_BUNDLE, (e) => {
      if (e) {
        console.log('error', e);
      } else {
        s.play();
        s.setNumberOfLoops(-1);
        console.log('duration', s.getDuration());
      }
    })


    var [x, y] = this.props.position

    this.state = {
      soundIns: s,
      centerItemPosition: this.props.centerItemPosition,
      flag: this.props.flag,
      position: {
        previousLeft: x,
        previousTop: y,
        lastLeft: x,
        lastTop: y
      },
      img: this.props.pathImg,
      size: this.props.size,
      style: {
        backgroundColor: this.props.color,
        width: this.props.size,
        height: this.props.size,
        borderRadius: this.props.size/2,
        left: x,
        top: y,
      }
    }

    console.log(this.state.img);
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
        backgroundColor: this.props.color,
        width: this.props.size,
        height: this.props.size,
        borderRadius: this.props.size/2,
        left: this.state.position.previousLeft,
        top: this.state.position.previousTop,
      }
    });
  }

  // 最近一次的移动距离为gestureState.move{X,Y}
  onPanResponderMove(evt, gestureState) {

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
        backgroundColor: this.props.color,
        width: this.props.size,
        height: this.props.size,
        borderRadius: this.props.size/2,
        left: this.state.position.previousLeft,
        top: this.state.position.previousTop,
      }
    });

    this.updateVolume();
  }

  updateVolume() {
    var l = Math.sqrt(Math.pow(this.state.position.previousLeft - this.state.centerItemPosition.previousLeft, 2) + Math.pow(this.state.position.previousTop - this.state.centerItemPosition.previousTop, 2))
    var volume = 1 - l / Util.size.height
    console.log('volume:' + volume)
    this.state.soundIns.setVolume(parseFloat(volume.toFixed(1)));
  }

  // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
  // 一般来说这意味着一个手势操作已经成功完成。
  onPanResponderEnd(evt, gestureState) {

    this.state.position.lastLeft = this.state.position.previousLeft;
    this.state.position.lastTop = this.state.position.previousTop;
    PubSub.publish('SceneCtrl.itemPosition', {
      flag: this.props.flag,
      position: [this.state.position.lastLeft, this.state.position.lastTop],
      path: this.props.path,
      pathImg: this.props.pathImg,
      color: this.props.color,
      size: this.props.size
    });
  }

  onPanResponderTerminate(evt, gestureState) {
  // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
    console.log('onPanResponderTerminate')
    return true
  }

  componentWillMount(evt, gestureState) {
    PubSub.subscribe('SceneCtrl', function (topic,data) {
      if(topic === 'SceneCtrl.centerPosition') {
        this.setState({
          centerItemPosition: data
        })
        this.updateVolume()
      }

      if(topic === 'SceneCtrl.pause') {
        if(data) {
          this.state.soundIns.setVolume(0);
        } else {
          this.updateVolume()
        }
      }

      if(topic === 'SceneCtrl.close') {
        console.log('close')
        this.state.soundIns.release();
      }
    }.bind(this));
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

  componentDidMount() {

  }

  componentWillUnmount() {
    PubSub.unsubscribe('SceneCtrl');
  }

  render() {
    return (
      <View
        {...this._panResponder.panHandlers}
        style={[styles.circle,{}, this.state.style]}>
        <Image source={{uri: this.state.img}} style={{width:this.props.size -20, height: this.props.size - 20,margin:10}} />
      </View>);
  }


  componentDidMount() {

  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

