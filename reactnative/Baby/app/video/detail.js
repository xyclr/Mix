
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
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicatorIOS,
    ListView,
    TouchableHighlight,
    Modal,
    AlertIOS
} from 'react-native';
import Button from 'react-native-button';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var Icon = require('react-native-vector-icons/FontAwesome');
var Video = require('react-native-video').default;
var request = require('../common/request');
var config = require('../common/config');


const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    VideoBox: {
        width: width,
        height: 260,
        backgroundColor:'#000'
    },
    loading:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        height:260
    },
    header: {
        width:width,
        height:40,
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.1)'
    },
    headerText: {
        textAlign:'center',
        fontSize:18,
        color:'#000'
    },
    backBox: {
        position:'absolute',
        left:10,
        top:5,
        flexDirection: 'row'
    },
    backIcon: {
        marginRight:5
    },
    backText: {
        alignSelf: 'center'
    },

    progressBox:{
        width:width,
        height:3,
        backgroundColor:'#eee'
    },
    progressBar: {
        width:0.001,
        height:3,
        backgroundColor:'#ed7b66'
    },
    videoError: {
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        height:260,
        alignItems:'center',
        justifyContent: 'center',
    },
    errorText:{
        color:'#fff',
        fontSize:14,
        alignSelf: 'center'
    },
    pauseBox: {
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
    },
    btnPlayBox: {
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        width:width,
        height:260,
        backgroundColor:'rgba(0,0,0,0.5)'
    },
    playBtn: {
        position:'absolute',
        left:width * 0.5 -32,
        top:130 -32,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:15,
        backgroundColor:'transparent',
        borderColor:'#fff',
        borderRadius:23,
        borderWidth:1,
        color:'#ed7b66'
    },

    infoBox: {
        flexDirection:'row',
        marginTop:20,
        justifyContent: 'center',
        paddingLeft:10,
        paddingRight:10
    },
    avatar: {
        width:60,
        height:60,
        borderRadius: 30,
        backgroundColor:'red',
        marginRight:5
    },
    descBox: {
        flex:1
    },
    nickname: {
        fontSize:18
    },
    desc: {
        fontSize:16,
        marginTop:8,
        color:'#333'
    },

    cHeader: {
        marginTop:10,
        paddingLeft:10,
        paddingBottom:10,
        borderBottomWidth:0.5,
        borderBottomColor: 'rgba(0,0,0,0.2)'
    },
    cHeaderText: {
        fontSize:16,
        color:'#333',
    },
    cInfoBox: {
        width:width,
        flexDirection:'row',
        marginTop:20,
        justifyContent: 'center',
        paddingLeft:10,
        paddingRight:10
    },
    cAvatar: {
        width:30,
        height:30,
        borderRadius: 15,
        backgroundColor:'red',
        marginRight:5
    },
    cDescBox: {
        flex:1
    },
    cNickname: {
        fontSize:16
    },
    cDesc: {
        fontSize:14,
        marginTop:4,
        color:'#666'
    },
    loadingMore: {
        marginVertical:10,
        width:width
    },
    loadingText: {
        fontSize:14,
        color:'#333',
        textAlign:'center'
    },

    commentsIpt: {
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        padding:5,
        height: 80,
        borderWidth: 1,
        borderColor:'rgba(0,0,0,0.2)',
        borderRadius:5,
        fontSize:16,
    },
    modalContainer: {
        flex:1,
        paddingTop:45,
        backgroundColor:'#fff'
    },
    closeIcon:{
        fontSize:30,
        color:'#ee753c',
        alignSelf:'center',

    },
    submitBtn:{
        width: width - 20,
        padding:16,
        marginTop:20,
        marginBottom:20,
        alignSelf:'center',
        borderWidth:1,
        borderColor:'#ee753c',
        borderRadius:5
    },
    commentsBox:{

    }

};
var cached = {
    nextPage: 1,
    items: [],
    total: 0
};
var Detail = React.createClass({
    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return{
            data: this.props.data,
            videoPercent: 0.1,
            videoReady: false,
            videoPlaying: false,
            videoLoaded: false,
            videoPause: false,
            videoError: false,
            videoEnd: false,

            //comments
            dataSource: ds.cloneWithRows([]),
            loadingTail: false,

            //modal
            modalVisible:false,
            commentsContent: '',
            commentsSending: false
        }
    },

    _pop(){
        this.setState({
            videoPause:true
        })
        this.props.navigator.pop();
    },

    _onLoadStart(){
        console.log('onLoadStart');
    },
    _onLoad(){
        console.log('onLoad');
        this.setState({
            videoLoaded: true
        })
    },

    _pauseAction(){
        this.setState({
            videoPause: !this.state.videoPause ? true : false
        })
    },

    _rePlay(){
        this.refs.videoPlayer.seek(0);
    },

    _onProgress(data){
        if(!this.state.videoReady) {
            this.setState({
                videoReady: true
            })
        }

        if(!this.state.videoPlaying) {
            this.setState({
                videoPlaying: true
            })
        }

        var playableDuration = data.playableDuration;
        var currentTime = data.currentTime;
        var percent = Number((currentTime / playableDuration).toFixed(4));
        this.setState({
            videoPercent: percent
        });
        console.log('onProgress');
    },
    _onEnd(){
        console.log('onEnd');
        this.setState({
            videoPercent: 1,
            videoPlaying: false,
            videoPause: true,
            videoEnd: true
        })
    },
    _onError(){
        console.log('onError');
        if(!this.state.videoError) {
            this.setState({
                videoError: true
            })
        }
    },

    render(){
        var data = this.state.data;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backBox} onPress={this._pop}>
                        <Icon name="angle-left" style={styles.backIcon} size={28}/>
                        <Text style={styles.backText}>返回</Text>
                    </TouchableOpacity>
                    <Text sytle={styles.headerText}>视频详情页</Text>
                </View>
                <View>
                    <Video
                        source={{uri: data.video}}   // Can be a URL or a local file.
                        rate={1.0}                     // 0 is paused, 1 is normal.
                        ref='videoPlayer'
                        volume={1}                   // 0 is muted, 1 is normal.
                        muted={false}                  // Mutes the audio entirely.
                        paused={this.state.videoPause}                 // Pauses playback entirely.
                        resizeMode="contain"             // Fill the whole screen at aspect ratio.
                        repeat={true}                  // Repeat forever.
                        playInBackground={false}       // Audio continues to play when app entering background.
                        playWhenInactive={false}       // [iOS] Video continues to play when control or notification center are shown.
                        progressUpdateInterval={25.0} // [iOS] Interval to fire onProgress (default to ~250ms)
                        onLoadStart={this._onLoadStart}
                        onLoad={this._onLoad}
                        onProgress={this._onProgress}
                        onEnd={this._onEnd}
                        onError={this._onError}
                        style={styles.VideoBox}
                    />

                    {
                        (!this.state.videoReady && !this.state.videoError) && <ActivityIndicatorIOS style={styles.loading} />
                    }

                    {
                        this.state.videoPlaying && this.state.videoLoaded
                        ?
                        <TouchableOpacity onPress={this._pauseAction} style={styles.pauseBox}>
                            {
                                this.state.videoPause
                                ? <View style={styles.btnPlayBox} ><Icon name='play' size={28}   style={styles.playBtn} /></View>
                                : <Text></Text>
                            }
                        </TouchableOpacity>
                        : null
                    }

                    {
                        this.state.videoError && <View style={styles.videoError}><Text style={styles.errorText}>视频加载失败</Text></View>
                    }

                    {
                        (this.state.videoPercent == 1 && this.state.videoEnd)
                        &&
                        <View style={styles.btnPlayBox} ><Icon name='play' size={28}  onPress={this._rePlay} style={styles.playBtn} /></View>

                    }
                    <View style={styles.progressBox}>
                        <View style={[styles.progressBar, {width: width * this.state.videoPercent}]}></View>
                    </View>
                </View>

                <ListView
                    showsVerticalScrollIndicator={false}
                    renderHeader={this._renderHeader}
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    onEndReached={this._fetchDataMore}
                    onEndReachedThreshold={20}
                    renderFooter={this._renderFooter}
                    showsVerticalScrollIndicator={false}
                />

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    >
                    <View style={styles.modalContainer}>
                        <Icon name='close' size={28} onPress={()=>this.setState({modalVisible: false})} style={styles.closeIcon} />
                        <TextInput
                            style={[styles.commentsIpt,{height:160}]}
                            multiline={true}
                            placeholder='输入评论内容'
                            onChangeText={(text) => {
                                this.setState({
                                    commentsContent:text
                                })
                            }}
                            />
                        <Button
                            containerStyle={styles.submitBtn}
                            onPress={this._submit}
                            style={{fontSize: 20, color:'#ee753c'}}
                            >
                            提交
                        </Button>
                    </View>
                </Modal>

            </View>
        )
    },

    _submit(){
        var content = this.state.commentsContent;
        if(content.length === 0) {
            return AlertIOS.alert('留言不能为空')
        }
        if(this.state.commentsSending) {
            return AlertIOS.alert('正在评论中!')
        }
        this.setState({
            commentsSending: true
        }, function(){
            var body = {
                accessToken: 'xx',
                _id: '123',
                content: content
            }
            var url = config.addr.base + config.addr.saveComments
            request.post(url,body)
            .then((data) => {
                if(data && data.success) {
                    var items = cached.items.slice()
                    items = [{
                        content: content,
                        user:  {
                            "avatar": "http://dummyimage.com/300x300/525708)",
                            "nickname": "Napsmbb Isool Nutxb Mvdcnss Opet"
                        }
                    }].concat(items)
                    cached.items = items
                    cached.total = cached.total + 1
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items),
                        commentsSending: false,
                        modalVisible: false
                    })
                }
            })
        })

    },

    _renderHeader(){
        var data = this.state.data;
        return(
            <View>
                <View style={styles.infoBox}>
                    <Image source={{uri: data.author.avatar}} style={styles.avatar} />
                    <View style={styles.descBox}>
                        <Text style={styles.nickname}>{data.author.nickname}</Text>
                        <Text style={styles.desc}>{data.author.desc}</Text>
                    </View>
                </View>
                <TextInput
                    style={styles.commentsIpt}
                    onFocus={() => {
                        this.setState({
                            modalVisible: true
                        })
                    }}
                    multiline={true}
                    placeholder='输入评论内容'
                    />
                <View style={styles.cHeader}>
                    <Text style={styles.cHeaderText}>评论列表</Text>
                </View>
            </View>
        )
    },

    _fetchData(page){
        var url = config.addr.base + config.addr.comments;
        var params = {
            accessToken: 'safasdf',
            page: page,
            _id: 'xxx'
        };
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var items = cached.items.slice();
        if(page !== 0) {
            this.setState({
                loadingTail: true
            });
            request.get(url, params).then((data) => {
                if(data) {
                    cached.nextPage++;
                    items = items.concat(data.data);
                    cached.items = items;
                    cached.total = data.total;
                    setTimeout(()=>{
                        this.setState({
                            loadingTail: false,
                            dataSource: ds.cloneWithRows(items)
                        })
                    },20)
                }
            }).catch(() => {
                this.setState({
                    loadingTail: false
                });
            });
        } else {
            this.setState({
                isRefreshing: true
            });
            request.get(url, params).then((data) => {
                if(data) {
                    cached.nextPage++;
                    items = data.data.concat(items);
                    cached.items = items;
                    cached.total = data.total;
                    setTimeout(()=>{
                        this.setState({
                            isRefreshing: false,
                            dataSource: ds.cloneWithRows(items)
                        })
                    },20)
                }
            }).catch(() => {
                this.setState({
                    isRefreshing: false
                });
            });
        }

    },

    componentDidMount(){
        this._fetchData(cached.nextPage);
    },

    _hasMore(){
        return cached.items.length !== cached.total
    },

    _fetchDataMore(){
        if(!this._hasMore() || this.state.loadingTail) {
            return ;
        }

        this._fetchData(cached.nextPage);
    },
    _renderFooter(){

        if(!this._hasMore() && cached.total !== 0) {
            return(
                <View style={styles.loadingMore}><Text style={styles.loadingText}>没有更多了</Text></View>
            )
        }

        if(this.state.loadingTail) {
            return <View style={styles.loadingMore}></View>
        }
        return  <ActivityIndicatorIOS style={styles.loadingMore} />
    },

    _renderRow(row) {
        return (
            <Item
                key={row._id}
                row={row}
                />
        )
    },

});

var Item = React.createClass({
    getInitialState(){
        return {
            row: this.props.row,
            up: false
        }
    },

    render(){
        var data = this.state.row;
        return(
            <TouchableHighlight>
                <View style={styles.cInfoBox}>
                    <Image source={{uri: data.user.avatar}} style={styles.cAvatar} />
                    <View style={styles.cDescBox}>
                        <Text style={styles.cNickname}>{data.user.nickname}</Text>
                        <Text style={styles.cDesc}>{data.content}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
});

// 输出组件类
module.exports = Detail;
