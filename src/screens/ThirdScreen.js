import {View ,Image ,ImageBackground,Text, TextInput, StatusBar , StyleSheet,Pressable,Button} from "react-native";
const colorimage = require("../../assets/FBG.png");
const colorimage2 = require("../../assets/Simple_Technolog png.png"); 
const firstimage = require("../../assets/thirdpage.jpg"); 
const LogoImg = require("../../assets/Artboard 3.png");



export default function HomeScreen({ navigation }){
return(
<View style={styles.container}>
<StatusBar barStyle={"light-content"}hidden/>
<ImageBackground source={colorimage} style={styles.BackGroundImage} resizeMode="cover">
<Image source={colorimage2} style={styles.BackGroundImage2} resizeMode="cover"/>



<View style={styles.containerr}>
            <Image
            source={LogoImg}
            resizeMode="contain"
            style={styles.imagee}
            />
            <Text style={styles.textt}>How to use application</Text>
            </View>
<Image source={firstimage} style={styles.firstimage} resizeMode="cover"/>

<Text style={styles.texttt}>Connect your smart gloves via microphone{'\n'}{'\n'}
Choose your language mode written text or audio.{'\n'}{'\n'}
Start signing – the app translates instantly.{'\n'}{'\n'}
Review and edit if needed.{'\n'}{'\n'}
Explore additional features for a better experience.</Text> 
        </ImageBackground>
</View>

);
}


const styles = StyleSheet.create({
  container:
  {
    position:"relative",
    flex:1,
  },

  BackGroundImage:
  {
    flex:1,
  },
  
  BackGroundImage2:
{
position:"relative",
    flex:1,
      width:370,
      bottom:-185,
      left:65,
      opacity:0.5,
      zIndex:1
    },    
    firstimage:
    {
      flex:1,
      position:"absolute",
      width:320,
      height:280,
      top:160,
      left:45,
      zIndex:5,
      borderRadius:30,

    },
    containerr: {
      position:"absolute",
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width:320,
      marginLeft:40,
      borderBottomColor:"white",
      borderBottomWidth:3,
      top:60,
  },

imagee: {
    width: 50,
    height: 50,
    marginBottom:10,
    justifyContent:"center"
    
},

textt: {
    fontSize: 23,
    marginBottom:10,
    
    paddingLeft:15,
    alignItems:"center",
    fontWeight:"bold",
    color:"white",
},  
texttt: {
  fontSize: 17,
  paddingLeft:45,
  alignItems:"center",
  fontWeight:"bold",
  color:"white",
  position:"absolute",
  bottom:130,
  width:400,
  textAlign:"left",
  zIndex:10,
}

});