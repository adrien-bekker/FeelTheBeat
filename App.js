import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Cam from "./screens/Cam.js";
import Input from "./screens/Input";
import Song from "./screens/Song";
import Favorite from "./screens/Favorites";

// You can import from local files
import AssetExample from "./components/AssetExample";

// or any pure javascript modules available in npm
import { Card } from "react-native-paper";

const App = createStackNavigator({
  InputScreen: { screen: Input },
  CameraScreen: { screen: Cam },
  SongScreen: { screen: Song },
  FavoriteScreen: { screen: Favorite },
});

export default createAppContainer(App);
