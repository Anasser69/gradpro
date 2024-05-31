import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  StatusBar,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";
import React, { Component } from "react";
import { Platform, PermissionsAndroid } from "react-native";
import FirstScreen from "./src/screens/FirstScreen";
import SecondScreen from "./src/screens/SecondScreen";
import ThirdScreen from "./src/screens/ThirdScreen";
import FourthScreen from "./src/screens/FourthScreen";
import MainScreen from "./src/screens/MainScreen";
import SignfiyScreen from "./src/screens/SignfiyScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const FirstPageIcon = require("./assets/home.png");
const SecondPageIcon = require("./assets/bolt.png");
const ThirdPageIcon = require("./assets/star.png");
const FourthPageIcone = require("./assets/info.png");
const MainPageIcon = require("./assets/add.png");


 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: false,
    };
  }

  componentDidMount() {
    this._handleAudioPermission();
  }

  _handleAudioPermission = () => {
    let recordAudioRequest;
    if (Platform.OS === 'android') {
      recordAudioRequest = this._requestRecordAudioPermission();
    } else {
      recordAudioRequest = new Promise((resolve) => {
        resolve(true);
      });
    }

    recordAudioRequest.then((hasPermission) => {
      if (hasPermission) {
        this.setState({ hasPermission: true });
        // Code that uses Porcupine or any other audio related code
      } else {
        console.log('Permission denied');
      }
    });
  }

  _requestRecordAudioPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'This app needs access to your microphone to recognize voice commands.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return (granted === PermissionsAndroid.RESULTS.GRANTED);
  }
  

  render() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 60,
            backgroundColor: "#9966ff",
            position: "absolute",
            borderColor: "transparent",
            borderRadius: 15,
            width: 380,
            marginVertical: 10,
            marginHorizontal: 15,
            elevation: 0,
          },
        }}
      >
        <Tab.Screen
          name="SignfiyScreen"
          component={SignfiyScreen}
          options={{
            tabBarStyle: { display: "none" },
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image
                    source={FirstPageIcon}
                    resizeMode="contain"
                    style={{
                      width: 1,
                      height: 1,
                      position: "relative",
                      right: 100,
                      display: "none",
                    }}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image
                    source={FirstPageIcon}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? "#C89AE1" : "white",
                      position: "relative",
                      right: 38,
                    }}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="SecondScreen"
          component={SecondScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image
                    source={SecondPageIcon}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? "#C89AE1" : "white",
                      position: "relative",
                      right: 30,
                    }}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Main"
          component={MainScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image
                    source={MainPageIcon}
                    resizeMode="contain"
                    style={{
                      width: 40,
                      height: 40,
                      tintColor: focused ? "#C89AE1" : "white",
                      position: "relative",
                      bottom: 30,
                      right: 30,
                    }}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="ThirdScreen"
          component={ThirdScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image
                    source={ThirdPageIcon}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? "#C89AE1" : "white",
                      position: "relative",
                      right: 30,
                    }}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="FourthScreen"
          component={FourthScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <Image
                    source={FourthPageIcone}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? "#C89AE1" : "white",
                      position: "relative",
                      right: 20,
                    }}
                  />
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
 }

export default App;