import {View ,Image ,ImageBackground,Text, TextInput, StatusBar , StyleSheet,Pressable,Button} from "react-native";
const colorimage = require("../../assets/FBG.png");
const colorimage2 = require("../../assets/Simple_Technolog png.png"); 
const firstimage = require("../../assets/fourthpage.jpg"); 
const secondimage = require("../../assets/Blacksmith-gloves-illustration-PNG-Design.png"); 
const thirdimage = require("../../assets/ASL-Alphabet-Educational-Print-Etsy.png"); 
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
            <Text style={styles.textt}>About App</Text>
          </View>
<Image source={firstimage} style={styles.firstimage} resizeMode="cover"/>

<Text style={styles.texttt}>the revolutionary app designed to break down communication barriers for the deaf and hard of hearing community. Our app utilizes smart gloves equipped with advanced technology to translate sign language gestures into written text or spoken words instantly. Whether you're a sign language user or not, our app provides a seamless platform for communication, fostering inclusivity and understanding in every interaction. Join us in transforming the way we communicate, one sign at a time</Text>



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
  fontSize: 16,
  lineHeight:28,
  paddingLeft:45,
  alignItems:"center",
  fontWeight:"bold",
  color:"white",
  position:"absolute",
  bottom:100,
  width:400,
  textAlign:"left",
  zIndex:10,
}

});