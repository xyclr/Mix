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
  View
} from 'react-native';

/**-------导入外部的组件类---------**/
var Main = require('./Component/Main/XMGMain');

class XMGBuy extends Component {
  render() {
    return (
        <Main />
    );
  }
}



AppRegistry.registerComponent('XMGBuy', () => XMGBuy);
