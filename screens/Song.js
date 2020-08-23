import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  StyleSheet,
} from "react-native";
import * as localHost from "./LocalHost";

export default class Song extends Component {
  constructor(props) {
    super(props);
    this.loadSongs();
  }

  static navigationOptions = {
    title: "Songs",
  };

  state = {
    isReady: false,
  };

  loadSongs = async () => {
    let res = await fetch(localHost.localHost + "/predict");
    let data = await res.json();
    this.songName1 = data.songName1;
    this.songName2 = data.songName2;
    this.songName3 = data.songName3;
    this.songName4 = data.songName4;
    this.songName5 = data.songName5;
    this.songLink1 = data.songLink1;
    this.songLink2 = data.songLink2;
    this.songLink3 = data.songLink3;
    this.songLink4 = data.songLink4;
    this.songLink5 = data.songLink5;
    this.emotion = data.emotion;
    this.setState({ isReady: true });
    console.log(this.songName1);
  };

  render() {
    const switchSongs = () => {
      this.setState({ isReady: false });
      this.songNamePlaceholder = this.songName1;
      this.songName1 = this.songName2;
      this.songName2 = this.songName3;
      this.songName3 = this.songName4;
      this.songName4 = this.songName5;
      this.songName5 = this.songNamePlaceholder;
      this.songLinkPlaceholder = this.songLink1;
      this.songLink1 = this.songLink2;
      this.songLink2 = this.songLink3;
      this.songLink3 = this.songLink4;
      this.songLink4 = this.songLink5;
      this.songLink5 = this.songLinkPlaceholder;
      this.setState({ isReady: true });
    };

    if (!this.state.isReady) {
      return <ActivityIndicator style={{ top: "50%" }} size={"large"} />;
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>{this.emotion}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Linking.openURL(this.songLink1)}
          >
            <Text style={styles.text}>{this.songName1}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => switchSongs()}>
            <Text style={styles.text}>Refresh</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    top: "40%",
  },
  text: {
    fontSize: 15,
    alignSelf: "center",
    textAlign: "center",
    marginBottom: 5,
    paddingBottom: 5,
  },
  button: {
    margin: 20,
    padding: 20,
  },
});
