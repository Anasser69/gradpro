import { StyleSheet, Text, View, ImageBackground,Image } from 'react-native';
import React, { useEffect } from 'react';
const logo = require("../../assets/Artboard 3.png");
const BackGroundImage = require("../../assets/FBG.png");

const SignfiyScreen = ({ navigation }) => {
useEffect(() => {
		setTimeout(() => {
			navigation.navigate('FirstScreen')
		},500);
	}, []); 
	return (
		<View style={styles.container}>

		<ImageBackground source={BackGroundImage} style={styles.BackGroundImage} resizeMode="cover">

            
            <View style={styles.logoimage}>
                <Image source={logo} style={styles.image}></Image>
            <Text style={styles.text}>Signfiy</Text>
			
            </View>
		</ImageBackground>

		</View>
		

	);
};
export default SignfiyScreen;


const styles = StyleSheet.create({
container:
{
	flex: 1,
	position:"relative"
},
text:
{
    color: 'white',
	fontSize: 40,
	fontWeight: 'bold',
	
},
logoimage:
{
position:"relative",
bottom:70,
left:110,
flex:1, 
justifyContent:"center",
alignItems:"center", 
width:200,
color:"#00A2DB",
},
image:
{
height:150, 
width:150,
},
BackGroundImage:
{
	flex:1
}
});