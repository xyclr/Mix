/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
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
    AsyncStorage,
    AlertIOS,
    Modal,
} from 'react-native'

var Dimensions = require('Dimensions')
var {width, height} = Dimensions.get('window')
var Icon = require('react-native-vector-icons/FontAwesome')

var ImagePicker = require('react-native-image-picker')
//var ImagePicker = require('NativeModules').ImagePickerManager
var Permissions = require('react-native-permissions')
var  sha1 = require('sha1')
var request = require('../common/request')
var config = require('../common/config')
import * as Progress from 'react-native-progress'
import Button from 'react-native-button';

var options = {
    title: '选择头像',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册选择',
    quality: 0.75,
    allowsEditing: true,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}

function avatar(id){
    if(id.indexOf('https') > -1) {
        return id
    }

    if(id.indexOf('data:image') > -1) {
        return id
    }

    if(id.indexOf('avatar/') > -1 ) {
        return config.cloudinary.image + id
    }

    return 'http://oj3fz4btl.bkt.clouddn.com/' + id
}

var Account = React.createClass({

    getInitialState(){
        var user = this.props.user || {}
        return ({
            user: user,

            avatarPercent: 0,
            avatarUploading: false,

            editModalVisible:false,
        })
    },

    componentDidMount(){
        AsyncStorage.getItem('user')
        .then((data) => {
                var user
                if(data) {
                    user = JSON.parse(data)
                }
                if(user && user.accessToken) {
                    this.setState({
                        user: user
                    })
                }
            })
    },

    _pickPhote(){
        var user = this.state.user
        var that = this
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)
            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else {
                // You can display the image using either data...
                var source = 'data:image/jpeg;base64,' + response.data
                var timestamp = Date.now()
                var tags = "app.avatar"
                var folder = 'avatar'

                var uri = response.uri

                request.post(config.addr.base + config.addr.signature,{
                    accessToken: user.accessToken,
                    type: 'avatar',
                    cloud: 'qiniu'
                }).then((data) => {
                    if(data && data.success) {

                        console.log(data.data)
                        var body = new FormData()
                        body.append('key', data.data.key)
                        body.append('token', data.data.token)
                        body.append('file', {
                            type: 'image/jpeg',
                            name: data.data.key,
                            uri: uri
                        })

                        that._upload(body)

                        //var body = new FormData()
                        //body.append('folder', folder)
                        //body.append('signature', signature)
                        //body.append('tags', tags)
                        //body.append('api_key', config.CLOUDINARY.api_key)
                        //body.append('resource_type', 'image')
                        //body.append('file', source)
                        //body.append('timestamp', timestamp)
                        //
                        //that._upload(body)
                    }
                }).catch((err) => {
                    AlertIOS.alert('签名失败')
                    console.log(err)
                })
            }
        })
    },

    _upload(body){
        var xhr = new XMLHttpRequest()
        var url = config.qiniu
        var user = this.state.user

        this.setState({
            avatarUploading: true
        })
        xhr.open('POST', url)
        xhr.onload = () => {
            console.log(xhr)
            if(xhr.status !== 200 || !xhr.responseText) {
                AlertIOS.alert('上传图片失败')
                console.log(xhr.responseText)
                this.setState({
                    avatarUploading: false
                })
                return
            }

            var res
            try {
                res = JSON.parse(xhr.response)
            }
            catch(e) {
                console.log(e)
                console.log('parse fails')
                this.setState({
                    avatarUploading: false,
                    avatarPercent: 0
                })
            }

            if(res && res.key) {
                console.log('upload suceess')
                console.log(res)
                user.avatar = res.key
                AsyncStorage.setItem('user', JSON.stringify(user))
                    .then(() => {
                        this.setState({
                            user: user,
                            avatarUploading: false,
                            avatarPercent: 0
                        })
                        this._asyncUser()
                    })
            }
        }

        if(xhr.upload) {
            xhr.upload.onprogress = (event) => {
                if(event.lengthComputable) {
                    var percent = Number((event.loaded / event.total).toFixed(2))
                    this.setState({
                        avatarPercent: percent
                    })
                    console.log(percent);
                }
            }
        }

        xhr.send(body)
    },

    _asyncUser(){
        var that = this
        var user = this.state.user

        if(user && user.accessToken) {
            var url = config.addr.base + config.addr.userUpdate

            request.post(url, {
                accessToken: user.accessToken,
                ...user
            }).then((data) => {
                if(data && data.success) {
                    //var data = data.data
                    //that.setState({
                    //    user: data
                    //})
                }
            }).catch((err) => {
                AlertIOS.alert('保存用户数据失败');
                console.log(err)
            })
        }
    },

    _changeUserState(key, value){
        var user = this.state.user
        user[key] = value;
        this.setState({
            user: user
        })
    },

    _editUser(){
        this.setState({
            editModalVisible: true
        })
    },

    _submit(){
        this._asyncUser();
        this.setState({
            editModalVisible: false,
            user: this.state.user
        })
    },

    render() {
        var that = this
        var user = this.state.user
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>我的账户</Text>
                    <Text style={styles.editBtn} onPress={this._editUser}>编辑</Text>
                </View>

                {
                    user.avatar  ?
                        <TouchableOpacity onPress={this._pickPhote} style={styles.avatarBox}>
                            <Image source={{uri: avatar(user.avatar)}} style={styles.avatarContainer}>
                                {
                                    that.state.avatarUploading ?
                                        <Progress.Circle progress={that.state.avatarPercent} size={75} showsText={true} color='#ed7b66' />
                                        : <Image source={{uri: avatar(user.avatar)}} style={styles.avatar} />

                                }

                                <Text style={{marginTop: 10,backgroundColor:'transparent', color: '#fff'}}>更换头像</Text>
                            </Image>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={this._pickPhote} style={styles.avatarBox}>
                            <View style={styles.avatarBox}>
                                <Text>添加宝宝的头像</Text>
                                {
                                    that.state.avatarUploading ?
                                        <Progress.Circle progress={that.state.avatarPercent} size={75} showsText={true} color='#ed7b66'  />
                                        : <Icon name='cloud-upload' size={28} style={styles.iconUpload}/>

                                }

                            </View>
                        </TouchableOpacity>
                }

                <Button
                    containerStyle={styles.submitBtn}
                    onPress={this.props.loginOut}
                    style={{fontSize: 20, color:'#ee753c'}}
                    >
                    退出
                </Button>

                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.editModalVisible}
                    >
                    <View style={styles.modalContainer}>
                        <Icon name='close' size={28} onPress={()=>this.setState({editModalVisible: false})} style={styles.closeIcon} />
                        <View style={styles.fieldItem}>
                            <Text style={styles.label}>昵称</Text>
                            <TextInput
                                placeholder='输入昵称'
                                style={styles.inputField}
                                autoCorrect={false}
                                defaultValue={user.nickname}
                                onChangeText={(text) => {
                                    user.nickname = text
                                }}
                                />
                        </View>
                        <View style={styles.fieldItem}>
                            <Text style={styles.label}>年龄</Text>
                            <TextInput
                                placeholder='输入昵称'
                                style={styles.inputField}
                                autoCorrect={false}
                                defaultValue={user.age}
                                onChangeText={(text) => {
                                    user.age = text
                                }}
                                />
                        </View>
                        <View style={styles.fieldItem}>
                            <Text style={styles.label}>性别</Text>
                            <Icon.Button name="male" style={user.gender === 'male' ? styles.genderChecked : styles.gender} size={28} onPress={() => this._changeUserState('gender', 'male')}>
                                男
                            </Icon.Button>
                            <Icon.Button name="female" style={user.gender === 'female' ? styles.genderChecked : styles.gender} size={28} onPress={() => this._changeUserState('gender', 'female')}>
                                女
                            </Icon.Button>
                        </View>
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
})

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    header: {
        width:width,
        backgroundColor:'#ee735c',
        paddingTop:30,
        paddingBottom:10,
    },
    headerText: {
        fontSize:18,
        alignSelf: 'center',
        color:"#fff"
    },
    editBtn: {
        position: 'absolute',
        top:30,
        right:10,
        fontSize:18,
        textAlign: 'right',
        color:"#fff"
    },
    avatarBox: {
        backgroundColor:'#eee',
        justifyContent:'center',
        alignItems: 'center'
    },
    iconUpload: {
        padding:20,
        backgroundColor:'#fff',
        borderRadius:5,
        marginTop:10,
    },
    avatar: {
        width:width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.1,
        resizeMode: 'cover',
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000'
    },
    avatarContainer: {
        width:width,
        height: 140,
        alignItems: 'center',
        justifyContent:'center',
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
        padding:10,
        marginTop:20,
        marginBottom:20,
        alignSelf:'center',
        borderWidth:1,
        borderColor:'#ee753c',
        borderRadius:5
    },
    fieldItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height:50,
        paddingLeft:15,
        paddingRight: 15,
        borderColor: '#eee',
        borderBottomWidth: 1
    },
    label: {
        color:'#ccc',
        marginRight:20
    },
    inputField: {
        flex:1,
        height:50,
        color:'#666'
    },
    gender: {
        backgroundColor: '#ccc'
    },
    genderChecked: {
        backgroundColor:'#ee735c'
    }

})

// 输出组件类
module.exports = Account
