import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  PorcupineManager,
  BuiltInKeywords,
} from "@picovoice/porcupine-react-native";
import FirstScreen from "./FirstScreen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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

  useEffect(() => {
    initPorcupineManager();
  }, []);

  useEffect(() => {
    console.log("Initializing Voice module...");
    Voice.onSpeechStart = speechStartHandler;
    Voice.onSpeechEnd = speechEndHandler;
    Voice.onSpeechResults = speechResultHandler;
    Voice.onSpeechError = speechErrorHandler;

    Voice.isAvailable()
      .then((available) => {
        if (available) {
          console.log("Voice module is available and initialized.");
        } else {
          console.error("Voice module is not available.");
        }
      })
      .catch((error) => {
        console.error("Error checking Voice module availability:", error);
      });

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  let lastDetectionTime = 0;
  const debounceTime = 3000; // 3 seconds
  async function initPorcupineManager() {
    try {
      const porcupineManager = await PorcupineManager.fromBuiltInKeywords(
        "MmtesG/JuNPsz0V6ExNm8xDbriUyOoLM7zI01V20Dx3qy8PsFiAhlw==",
        [BuiltInKeywords.HEY_GOOGLE, BuiltInKeywords.HEY_SIRI],
        (keywordIndex) => {
          const currentTime = Date.now();
          if (currentTime - lastDetectionTime > debounceTime) {
            lastDetectionTime = currentTime;
            if (keywordIndex === 0) {
              console.log("Detected Hey Google");
            } else if (keywordIndex === 1) {
              console.log("Detected Hey Siri");
              setHeySiriDetected(true);
              startRecording();
            }
          }
        }
      );
      await porcupineManager.start();
    } catch (error) {
      console.error("Error initializing PorcupineManager:", error);
    }
  }

  const stopRecordingAfterDuration = (duration) => {
    setTimeout(() => {
      stopRecording();
    }, duration);
  };

  const startRecording = async () => {
    setRecording(true);
    try {
      await Voice.start("en-US");
      stopRecordingAfterDuration(10000); // Stop recording after 10 seconds
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
      fetchresponse();
    } catch (error) {
      console.log("Error stopping the recording: ", error);
    }
  };

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
  console.log("Speech error handler", e);
  if (e.error && e.error.message) {
    console.error(`Error code: ${e.error.code}, message: ${e.error.message}`);
    if (e.error.code === 7) {
      console.error(
        "No match found. Please try speaking more clearly or use a different phrase."
      );
      // Retry mechanism
      setTimeout(() => {
        startRecording();
      }, 1000); // Retry after 1 second
    } else {
      // Handle other errors
      console.error(
        "An error occurred during speech recognition:",
        e.error.message
      );
    }
  }
};

  const fetchresponse = (text) => {
    if (text.trim().length > 0) {
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
                />
              </TouchableOpacity>
            )}
          </View>
          <Text>{isListening ? "Listening..." : 'Say "Hey PicoVoice"'}</Text>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
