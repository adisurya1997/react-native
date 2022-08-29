import { StatusBar } from "expo-status-bar";
import React,{useState} from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';


export default function LandingPage({navigation}) {

    const [isLoading, _] = useState(false);


    return (
        <View style={style.container}>
            <StatusBar />

            <Animatable.View duration={4000} iterationCount="infinite" direction="alternate" animation="slideInDown" style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Image
              source={{ uri: 'https://res.cloudinary.com/agastyo-atallah-al-ardhi/image/upload/v1661444001/TodoApp/accept-request_1_vucipg.svg'}}
              style={{width:228, height:258}}
            />
            </Animatable.View>

            <Text style={style.header}>Ways <Text style={{color:'#B82020'}}>To</Text><Text style={{color:'#FF5555'}}>DO</Text></Text>

            <View style={{marginBottom:60}}>
                <Text style={{textAlign:'center', fontSize:12, paddingStart: 55, paddingEnd: 55}}>
                    Write your activity and finish your activity. Fast, simple and easy to youse
                </Text>
            </View>

            <TouchableOpacity style={style.LoginButton} onPress={() => navigation.navigate("Login")} class='mb-5'>
                {
                    isLoading ? <Text style={style.textButton}>Loading ...</Text> : <Text style={style.textButton}>Login</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity style={style.RegisterButton}  onPress={() => navigation.navigate("Register")}>
                {
                    isLoading ? <Text style={style.textButton}>Register ...</Text> : <Text style={style.textButton}>Register</Text>
                }
            </TouchableOpacity>
        </View>
    );
}

// Create Variable for CSS
const style = StyleSheet.create({
    container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center'
  },
  header: {
    color: 'black',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign:'center'
  },

  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  LoginButton: {
    backgroundColor: '#FF5555',
    height: 40,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    marginBottom:10
  },
  RegisterButton: {
    backgroundColor: '#000',
    opacity:'31%',
    height: 40,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center'
  }
})
