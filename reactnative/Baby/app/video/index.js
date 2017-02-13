import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TextInput,
    Image,
    Platform,
    ScrollView,
    ListView,
    ActivityIndicatorIOS,
    RefreshControl,
    AlertIOS
} from 'react-native';

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var Icon = require('react-native-vector-icons/FontAwesome');
var request = require('../common/request');
var config = require('../common/config');
var Detail = require('./detail');

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        flex: 1
    },
    header: {
        paddingTop: 25,
        paddingBottom: 12,
        backgroundColor: '#ed7b66'
    },
    headerText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600'
    },
    item: {
        width: width,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    title: {
        padding: 10,
        fontSize:18,
        color:'#333'
    },
    thumb: {
        width: width,
        height: width * 0.5,
        resizeMode: 'cover'
    },
    itemFooter: {
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#eee'
    },

    handelBox: {
        width: width * 0.5 - 0.5,
        padding:10,
        flexDirection:'row',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    handelText: {
        paddingLeft: 12,
        fontSize: 18,
        color:'#333'
    },
    play: {
        position: 'absolute',
        bottom:14,
        right:14,
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
    up: {
        fontSize:22,
        color:'#ed7b66'
    },
    down: {
        fontSize:22,
        color:'#333'
    },
    comment: {
        fontSize:22,
        color:'#333'
    },
    loadingMore: {
        marginVertical:10,
        width:width
    },
    loadingText: {
        fontSize:14,
        color:'#333',
        textAlign:'center'
    }

});


var Item = React.createClass({
    getInitialState(){
        return {
            row: this.props.row,
            up: false
        }
    },

    _up(){
        var url = config.addr.base + config.addr.up;
        var body = {
            up: this.state.up ? 'yes' : 'no',
            accessToken: 'safasdf'
        };
        request.post(url,body)
        .then((res) => {
                if(res.success) {
                    this.setState({up: !this.state.up});
                }
                 else {
                    AlertIOS.alert('接口错误')
                }
            })
        .catch(() => {
                AlertIOS.alert('接口错误')
            })
    },

    render(){
        var row = this.state.row;
        return(
            <TouchableHighlight onPress={this.props.onSelect}>
                <View style={styles.item}>
                    <Text style={styles.title}>
                        {row.title}
                    </Text>

                    <Image source={{uri: row.thumb}} style={styles.thumb}>
                        <Icon name='play' size={28} style={styles.play}/>
                    </Image>
                    <View style={styles.itemFooter}>
                        <View style={styles.handelBox} >
                            <Icon onPress={this._up} name={this.state.up ? 'heart' : 'heart-o'} size={28} style={[styles.up, this.state.up ? null : styles.down ]}/>
                            <Text onPress={this._up} style={styles.handelText}>喜欢</Text>
                        </View>
                        <View style={styles.handelBox}>
                            <Icon name='comment-o' size={28} style={styles.comment}/>
                            <Text style={styles.handelText}>喜欢</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
});

var cached = {
    nextPage: 1,
    items: [],
    total: 0
};
var Video = React.createClass({

    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
            loadingTail: false,
            isRefreshing: false,
        };
    },

    componentDidMount(){
        this._fetchData(cached.nextPage);
    },

    _fetchData(page){
        var url = config.addr.base + config.addr.videos;
        var params = {
            accessToken: 'safasdf',
            page: page
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

    _hasMore(){
        return cached.items.length !== cached.total
    },

    _fetchDataMore(){
        if(!this._hasMore() || this.state.loadingTail) {
            return ;
        }
        this._fetchData(cached.nextPage);
    },

    _onRefresh(){
        console.log(!this._hasMore());
        if(!this._hasMore() || this.state.isRefreshing) return ;
        this._fetchData(0);
    },

    _loadPageDetail(row){
        this.props.navigator.push({
            name: 'detail',
            component: Detail,
            params: {
                data: row
            }
        })
    },

    _renderRow(row) {
        return (
            <Item
                onSelect={() => this._loadPageDetail(row)}
                key={row._id}
                row={row}
            />
        )
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>列表页面</Text>
                </View>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    onEndReached={this._fetchDataMore}
                    onEndReachedThreshold={20}
                    renderFooter={this._renderFooter}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                      <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        tintColor="#ff0000"
                        title="加载中..."
                        />}
                    />
            </View>
        );
    },
});

// 输出组件类
module.exports = Video;
