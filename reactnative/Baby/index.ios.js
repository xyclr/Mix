/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
var Main = require('./app/main/main');
var Dog = React.createClass({
  render() {
    return (
        <Main />
    );
  }
});


AppRegistry.registerComponent('Baby', () => Dog);
