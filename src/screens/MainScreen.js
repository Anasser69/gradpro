import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  LogBox,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  PorcupineManager,
  BuiltInKeywords,
} from "@picovoice/porcupine-react-native";
import FirstScreen from "./FirstScreen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import Features from "../components/features";
import { dummyMessages } from "../constants";
import Voice from "@react-native-voice/voice";
const colorimage = require("../../assets/FBG.png");

export default function MainScreen() {
  const [messages, setMessages] = useState(dummyMessages);
  const [recording, setRecording] = useState(false);
  const [speaking, setSpeaking] = useState(true);
  const [result, setResult] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [heySiriDetected, setHeySiriDetected] = useState(false);

  let detectionCallback = (keywordIndex) => {
    if (keywordIndex === 0) {
      // detected `porcupine`
      console.log("Detected Porcupine");
    } else if (keywordIndex === 1) {
      // detected `bumblebee`
      console.log("Detected Bumblebee");
    }
  };

  useEffect(() => {
    initPorcupineManager(startRecording);
  }, []);

  async function initPorcupineManager() {
    try {
      const porcupineManager = await PorcupineManager.fromBuiltInKeywords(
        "MmtesG/JuNPsz0V6ExNm8xDbriUyOoLM7zI01V20Dx3qy8PsFiAhlw==",
        [BuiltInKeywords.HEY_GOOGLE, BuiltInKeywords.HEY_SIRI],
        (keywordIndex) => {
          if (keywordIndex === 0) {
            console.log("Detected Hey Google");
          } else if (keywordIndex === 1) {
            console.log("Detected Hey Siri");
            setHeySiriDetected(true);
            startRecording();
          }
        }
      );
      await porcupineManager.start();
    } catch (error) {
      console.error("Error initializing PorcupineManager:", error);
    }
  }

  function startRecording() {
    setRecording(true);
    try {
      Voice.start("en-US");
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const speechStartHandler = (e) => {
    console.log("Speech Start Handler");
  };

  const speechEndHandler = (e) => {
    setRecording(false);
    console.log("Speech End Handler");
  };

  const speechResultHandler = (e) => {
    console.log("Voice Event", e);
    const text = e.value[0]; // Assuming you want the first complete result
    setResult(text);
    fetchresponse(text);
  };

  const speechErrorHandler = (e) => {
    console.log("speech error handler", e);
  };

  // const startRecording = async () => {
  //   setRecording(true);
  //   if (heySiriDetected){
  //     try {
  //       await Voice.start("en-US", "ar-EG");
  //     } catch (error) {
  //       console.log("Error: ", error);
  //     }
  // };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
      // Immediately fetch and display the response
      fetchresponse();
    } catch (error) {
      console.log("Error stopping the recording: ", error);
    }
  };

  const fetchresponse = (text) => {
    if (text.trim().length > 0) {
      // Update the messages array with the actual result
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content: text },
      ]);
    }
  };

  const clear = () => {
    setMessages([]);
  };

  const stopSpeaking = () => {
    setSpeaking(false);
  };

  useEffect(() => {
    // voice handler events
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultHandler;
    Voice.onSpeechError = speechErrorHandler;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  console.log("result: ", result);

  return (
    <ImageBackground source={colorimage} className="flex-1" resizeMode="cover">
      <View className="flex-1">
        <SafeAreaView className="flex flex-1 mx-5">
          {/* bot icon */}
          <View
            style={{ marginTop: StatusBar.currentHeight || 0 }}
            className="flex-row justify-center"
          >
            <Image
              source={require("../../assets/Artboard 3.png")}
              style={{ height: hp(15), width: hp(15) }}
            />
          </View>

          {/* features || message */}
          {messages.length > 0 ? (
            <View className="space-y-2 flex-1">
              <Text
                style={{ fontSize: wp(5) }}
                className="text-white font-semibold ml-1"
              >
                Assisstant
              </Text>
              <View
                style={{ height: hp(40) }}
                className="bg-neutral-200 rounded-3xl p-4"
              >
                <ScrollView
                  bounces={false}
                  className="space-y-4"
                  showsHorizontalScrollIndicator={false}
                >
                  {messages.map((message, index) => {
                    if (message.role == "assisstant") {
                      if (message.content.includes("https")) {
                        // it is an image
                        return (
                          <View key={index} className="flex-row justify-start">
                            <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none">
                              <Image
                                source={{ uri: message.content }}
                                className="rounded-2xl"
                                resizeMode="contain"
                                style={{ height: wp(60), width: wp(60) }}
                              />
                            </View>
                          </View>
                        );
                      } else {
                        //text response
                        return (
                          <View
                            key={index}
                            style={{ width: wp(70) }}
                            className="bg-emerald-100 rounded-xl p-2 rounded-tl-none"
                          >
                            <Text>{message.content}</Text>
                          </View>
                        );
                      }
                    } else {
                      // user input
                      return (
                        <View key={index} className="justify-end flex-row">
                          <View
                            style={{ width: wp(70) }}
                            className="bg-white rounded-xl p-2 rounded-tr-none"
                          >
                            <Text>{message.content}</Text>
                          </View>
                        </View>
                      );
                    }
                  })}
                </ScrollView>
              </View>
            </View>
          ) : (
            <FirstScreen />
          )}
          {/* recording , clear , stop  */}
          <View className="flex justify-center items-center">
            {recording ? (
              <TouchableOpacity onPress={stopRecording}>
                <Image
                  className="rounded-full mb-20 bottom-5 "
                  source={require("../../assets/Ripple.gif")}
                  style={{ width: hp(10), height: hp(10) }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={startRecording}>
                <Image
                  className="rounded-full mb-20 bottom-5"
                  source={require("../../assets/microphone.png")}
                  // style={{ width: hp(10), height: hp(10) }}
                />
              </TouchableOpacity>
            )}
            {/* {messages.length > 0 && (
              <TouchableOpacity
                onPress={clear}
                className="bg-neutral-400 rounded-3xl p-2 absolute right-10 top-5"
              > */}
            {/* <Text className="text-white font-semibold">Clear</Text> */}
            {/* </TouchableOpacity>
            )} */}
            {/* {speaking && (
              <TouchableOpacity
                onPress={stopSpeaking}
                className="bg-red-400 rounded-3xl p-2 absolute left-10 top-5"
              >
                <Text className="text-white font-semibold">Stop</Text>
              </TouchableOpacity>
            )} */}
          </View>
          <Text>{isListening ? "Listening..." : 'Say "Hey PicoVoice"'}</Text>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
