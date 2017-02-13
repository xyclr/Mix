/**
 * Created by Alex on 17/1/10.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  TouchableOpacity,
  Modal,
  ListView,
  TextInput,
  Image,
  Platform
} from 'react-native'
import PubSub from 'pubsub-js'
import _ from 'lodash'
import SideMenu from 'react-native-side-menu'
import Util from '../common/util'
import Audio from '../audio/audio'
import CenterItem from './centerItem'
import Config from '../config/config'
import Storage from '../common/deviceStorage'
const uuidV4 = require('uuid/v4');

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPause: false
    }
  }
  render() {
    return (
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuBtn} onPress={() => this.props.handler('add')}>
          <Image source={require('../../assets/img/add.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBtn} onPress={() => {
          this.setState({
            isPause: !this.state.isPause
          })
          this.props.handler('pause')
        }}>
          {this.state.isPause ?
            <Image source={require('../../assets/img/play.png')} style={styles.menuIcon} /> :
            <Image source={require('../../assets/img/pause.png')} style={styles.menuIcon} />
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBtn} onPress={() => this.props.handler('close')}>
          <Image source={require('../../assets/img/close.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBtn} onPress={() => this.props.handler('save')}>
          <Image source={require('../../assets/img/save.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuBtn} onPress={() => this.props.handler('load')}>
          <Image source={require('../../assets/img/load.png')} style={styles.menuIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}


export default class Main extends Component {
  constructor(props) {
    super(props);

    var size = 80
    var left = Util.size.width /2 - size/2
    var top = Util.size.height /2 - size/2

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      items: [],
      centerItemPosition : {
        previousLeft: left,
        previousTop: top,
        lastLeft: left,
        lastTop: top
      },

      musicCat: ds.cloneWithRows(Config.music),
      musics: ds.cloneWithRows([]),
      musicListModalVisible: false,
      isMusicList: true,

      isPause: false,

      sceneList:  [],
      isSceneSave: true,
      isSceneDel: false,
      sceneListDs: ds.cloneWithRows([]),
      sceneListModalTitle: '',
      sceneListModalVisible:false,

      sceneNameModalVisible: false,
      inputName: '',

      menuIsOpen: false
    }

    Storage.get('saveList').
      then((data) => {
        if(data) {
          this.setState({
            sceneList: data,
            sceneListDs: ds.cloneWithRows(data)
          })
        }
      })
  }

  componentDidMount() {
    PubSub.subscribe('SceneCtrl', function (topic,data) {
      if (topic === 'SceneCtrl.itemPosition') {
        var items = this.state.items
        items.forEach(function(item,key){
          if(item.flag === data.flag) items[key] = data
        });
        this.setState({
          items: items
        })
        console.log('items:')
        console.log(this.state.items)
      }
    }.bind(this))
  }

  componentWillUnmount() {
    PubSub.unsubscribe('SceneCtrl');
  }

  render() {
    var that = this
    var Items = null
    var  menu = <Menu handler={this.menuHandler.bind(this)} />

    Items = this.state.items.map(function (item, key) {
      return  <Audio {...item} key={key} centerItemPosition={that.state.centerItemPosition} />;
    });


    return (

        <SideMenu menu={menu} isOpen={this.state.menuIsOpen} openMenuOffset={70} >
          <Image source={require('../../assets/img/bg.jpg')} style={styles.backgroundImg}>
          <View style={styles.container}>

            {Items}
            <CenterItem  />
            <TouchableOpacity style={{width:50, height:50, marginLeft:10, marginTop:22}} onPress={() => {this.setState({menuIsOpen: true})}}>
              <Image source={require('../../assets/img/setting.png')} style={styles.menuIcon} />
            </TouchableOpacity>

            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.musicListModalVisible}
              onRequestClose={() => {this.setState({musicListModalVisible: false})}}
              >
              <View style={styles.modalContainer}>
                {
                  this.state.isMusicList ?
                    <View >
                      <View style={styles.modalHeader}>
                        <Text style={styles.btnBack} onPress={() => {this.setState({musicListModalVisible: false})}}>
                          <Image  source={require('../../assets/img/back.png')} style={styles.btnBackIcon} />
                        </Text>
                        <Text style={styles.title}>声音分类</Text>
                        <Text style={styles.btnSave} onPress={this.saveSceneListItem.bind(this)}></Text>
                      </View>
                      <ListView
                        dataSource={this.state.musicCat}
                        renderRow={(rowData) => <Text onPress={() => this.getMusicsByCat(rowData.name)}  style={styles.musicItem}>{rowData.name}</Text>}
                        />
                    </View>
                    :
                    <View >
                      <View style={styles.modalHeader}>
                        <Text style={styles.btnBack} onPress={() => {this.setState({musicListModalVisible: false})}}><Image  source={require('../../assets/img/back.png')} style={styles.btnBackIcon} /></Text>
                        <Text style={styles.title}>声音分类</Text>
                        <Text style={styles.btnSave}></Text>
                      </View>
                      <ListView
                        dataSource={this.state.musics}
                        renderRow={(rowData) => <Text style={styles.musicItem} onPress={() => this.addItem(rowData)}>{rowData.name}</Text>}
                        />
                    </View>
                }

              </View>
            </Modal>


            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.sceneListModalVisible}
              onRequestClose={() => {this.setState({sceneListModalVisible: false})}}
              >
              <View style={styles.modalContainer}>
                {
                  <View >
                    <View style={styles.modalHeader}>
                      <Text style={styles.btnBack} onPress={() => {this.setState({sceneListModalVisible: false})}}><Image  source={require('../../assets/img/back.png')} style={styles.btnBackIcon} /></Text>
                      <Text style={styles.title}>加载场景</Text>
                      <Text style={{marginRight:10}} onPress={() =>{this.setState({isSceneDel: !this.state.isSceneDel})}}></Text>
                    </View>
                    <ListView
                      enableEmptySections={this.state.isSceneSave}
                      dataSource={this.state.sceneListDs}
                      renderRow={this.renderSceneListItem.bind(this)}
                      />
                  </View>
                }

              </View>
            </Modal>

            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.sceneNameModalVisible}
              onRequestClose={() => {this.setState({sceneNameModalVisible: false})}}
              >
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.btnBack} onPress={() => {this.setState({sceneNameModalVisible: false})}}><Image  source={require('../../assets/img/back.png')} style={styles.btnBackIcon} /></Text>
                  <Text style={styles.title}>场景名称</Text>
                  <Text style={styles.btnSave} onPress={this.saveSceneListItem.bind(this)}>保存</Text>
                </View>
                <View>
                  <TextInput
                    style={styles.inputName}
                    onChangeText={(inputName) => this.setState({inputName})}
                    value={this.state.inputName}
                    />
                </View>
              </View>
            </Modal>
          </View>
          </Image>
        </SideMenu>



    );
  }

  menuHandler(name) {
    if(name === 'add') {
      this.addItemModal()
    }

    if(name === 'pause') {
      this.pause()
    }

    if(name === 'close') {
      this.close()
    }

    if(name === 'save') {
      this.save()
    }

    if(name === 'load') {
      this.load()
    }

  }

  delSceneListItem(flag) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var sceneList = this.state.sceneList.concat([]);
    sceneList = _.dropWhile(sceneList, function(item) {
      return item.flag === flag;
    });
    this.setState({
      sceneList: sceneList,
      menuIsOpen: false,
      sceneListDs:ds.cloneWithRows(sceneList)
    })
    Storage.save('saveList', sceneList)
  }

  loadSceneListItem(flag){
    Storage.get('saveList').
      then((data) => {
        if(!data) return;
        this.close()
        var sceneList = data;
        var items = _.dropWhile(sceneList, function(item) {
          return item.flag !== flag;
        });
        console.log(items[0].items)
        console.log(flag)
        this.setState({
          menuIsOpen: false,
          items: items[0].items,
          sceneListModalVisible: false,
        })
      })
  }

  saveSceneListItem(){
    var name = this.state.inputName
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    var sceneList = this.state.sceneList
    if(name.length === 0) return

    sceneList.push({
      flag: uuidV4(),
      name: name,
      items: this.state.items.concat([])
    })
    this.setState({
      sceneList: sceneList,
      sceneListDs:ds.cloneWithRows(sceneList),
      sceneNameModalVisible: false,
      inputName: '',
      menuIsOpen: false,
    })
    console.log(sceneList)
    Storage.save('saveList', sceneList)
  }

  renderSceneListItem(rowData) {
    return(
      <View style={styles.SceneListItem}>
        <Text style={styles.musicItem} onPress={() => this.loadSceneListItem(rowData.flag)}>{rowData.name}</Text>
        <Text style={styles.musicItemDel} onPress={() => this.delSceneListItem(rowData.flag)}>删除</Text>
        {
          false && <Text style={styles.musicItemDel} onPress={() => this.delSceneListItem(rowData.flag)}>删除</Text>
        }
      </View>
    )
  }


  getMusicsByCat(cat) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var musics = []
    Config.music.forEach(function(item){
      if(item.name === cat) musics = item
    });
    console.log(musics)
    this.setState({
      isMusicList: false,
      musics: ds.cloneWithRows(musics.list),
    })
  }

  pause() {
    var state = !this.state.isPause
    this.setState({
      isPause: state
    })
    PubSub.publish('SceneCtrl.pause', state);
  }

  close() {
    PubSub.publishSync('SceneCtrl.close');
    this.setState({
      items: [],
      menuIsOpen: false,
    })
  }

  load(){
    this.setState({
      sceneListModalTitle: '加载场景',
      sceneListModalVisible: true
    })
  }

  save(){
    this.setState({
      sceneNameModalVisible: true
    })
  }

  addItemModal() {
    this.setState({
      musicListModalVisible: true
    })
  }

  getRandomNum(Min,Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
  }

  getRandomPosition(size){
    var x = this.getRandomNum(0, Util.size.width)
    var y = this.getRandomNum(0, Util.size.height)

    if (x <= 0) {
      x = 0;
    }
    if (y <= 0) {
      y = 0;
    }
    if (x >= Util.size.width - size) {
      x = Util.size.width - size;
    }
    if (y >= Util.size.height - size) {
      y = Util.size.height - size;
    }
    return [x,y]
  }

  getRandomColor(){

    return  '#' +
      (function(color){
        return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
        && (color.length == 6) ?  color : arguments.callee(color);
      })('');
  }

  addItem(data) {
    var items = this.state.items.concat([{
      flag:uuidV4(),
      position: this.getRandomPosition(80),
      path: data.mFileName + '.mp3',
      pathImg: data.imgFileName,
      color: this.getRandomColor(),
      size: this.getRandomNum(60, 100),
    }]);

    this.setState({
      items: items,
      musicListModalVisible: false,
      isMusicList:true,
      menuIsOpen: false
    })
  }
}

var styles = StyleSheet.create({
  backgroundImg:{
    flex:1,
    width: null,
    height: null,
    flexDirection: 'row'
  },
  container: {
    flex: 1
  },
  btnBox: {
    width: Util.size.width,
    position: 'absolute',
    top: 25,
    flexDirection: 'row'
  },
  menuContainer: {
    paddingLeft:10,
    paddingRight: 10,
    backgroundColor: '#ddd',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  menuBtn: {
    borderRadius: 50,
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 5
  },
  menuIcon: {
    width:50,
    height:50
  },
  menuText: {
    marginTop:2,
    fontSize: 20
  },
  btnAdd: {
    width: 100,
    height: 80,
    backgroundColor: 'gray'
  },
  modalContainer: {
    marginTop: Platform.OS == 'ios' ? 22 : 0,
  },

  modalHeader: {
    height: 40,
    backgroundColor: 'gray',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  btnBackIcon: {
    width: Platform.OS == 'ios' ? 28 : 40,
    height: Platform.OS == 'ios' ? 25 : 60,
  },
  title: {
    alignItems: 'center',
    fontSize:18,
    color: '#fff'
  },
  btnBack: {
    fontSize:30,
    color:'#000',
    marginLeft:10,
    marginTop:Platform.OS == 'ios' ? 15 : 0,
  },
  btnSave: {
    fontSize:18,
    marginRight:10,
    color: '#fff'
  },
  inputName: {
    margin:10,
    borderColor:'gray',
    borderWidth: 1,
    height:40,
    paddingLeft: 5,
    paddingRight: 5,
  },
  musicItem: {
    fontSize:16,
    padding:10
  },
  musicItemDel: {

  },
  SceneListItem: {
    padding:10,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center'
  }
});