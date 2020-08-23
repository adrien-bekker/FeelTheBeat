import React, { Component } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import * as localHost from "./LocalHost";

export default class Input extends Component {
  static navigationOptions = {
    title: "Home",
  };

  render() {
    async function post() {
      const song = { pref };
      console.log(song);
      console.log(localHost.localHost + "/setpreferences");
      const response = await fetch(localHost.localHost + "/setpreferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(song),
      });
      if (response.ok) {
        console.log("response worked");
      }

      navigate("CameraScreen");
    }

    let pref = "";
    let setPref = (txt) => {
      pref = txt;
    };

    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/feelthebeat.png")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Welcome to Feel The Beat! Enter your preferred genres and artists
          below (separated by commas).
        </Text>
        <View styles={styles.textinput}>
          <TextInput
            style={styles.textInput}
            placeholder={"Preferences"}
            onChange={(e) => setPref(e.target.value)}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={() => post()} style={styles.button}>
          <Text style={styles.buttonText}>Continue</Text>
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
  },
  button: {
    borderColor: "black",
    borderWidth: "5%",
    alignSelf: "center",
    top: "5%",
    borderRadius: "10%",
  },
  buttonText: {
    fontSize: 20,
    padding: 7,
  },
  image: {
    top: -40,
    width: 150,
    height: 200,
    alignSelf: "center",
    margin: 20,
  },
  text: {
    top: -40,
    textAlign: "center",
    fontSize: 25,
  },
  textInput: {
    borderColor: "black",
    marginTop: "5%",
    borderWidth: "2%",
    textAlign: "center",
    fontSize: 20,
  },
});
