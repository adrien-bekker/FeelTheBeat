import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as localHost from "./LocalHost";

export default class Cam extends Component {
  static navigationOptions = {
    title: "Upload Image",
  };

  state = {
    image: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    let { image } = this.state;

    const picFromGallery = async () => {
      const granted = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (granted) {
        let data = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
        console.log(data);
        if (!data.cancelled) {
          this.setState({ image: data.uri });
        } else {
          console.log("Permission Denied");
        }
      }
    };

    const nextScreen = async () => {
      navigate("SongScreen");
      if (image !== null) {
        try {
          let response = await fetch(
            localHost.localHost + "/saveimage/" + image
          );
        } catch (err) {
          console.error(err);
        }
      }
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => picFromGallery()}>
          <Image
            source={require("../assets/gallery.png")}
            style={styles.image}
          ></Image>
        </TouchableOpacity>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <TouchableOpacity onPress={() => nextScreen()}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    top: -100,
    height: 250,
    width: 250,
  },
});
