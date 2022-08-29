import { StatusBar } from "expo-status-bar";
import { Dropdown } from 'react-native-element-dropdown';
import React,{useState,useEffect} from "react";
import {Image, View, StyleSheet, Text, TextInput, TouchableOpacity,FlatList} from "react-native";
import * as Animatable from 'react-native-animatable';
import TodoCategory from "../component/TodoCategory";
import TodoStatus from "../component/TodoStatus";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function ListToDo({navigation}) {
  const [form, setForm] = useState({
    email: '',
    password: '',
});

const [data, setData] = useState([]);
const [dataLoading, setDataLoading] = useState(false);

const getData = async() =>{
  try {
      const token = await AsyncStorage.getItem('token');
      if (token === null) {
          navigation.navigate("Login")
      }

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token
          },
      };

      setDataLoading(true);

      const res = await axios.get('https://api.kontenbase.com/query/api/v1/dc6d77a1-6f9f-4208-a95a-afd3b4216575/Todos', config);
      setData(res.data)
      setDataLoading(false)

  } catch (error) {
      console.log(error);
      setDataLoading(false)
  }
}

useEffect(()=> {
getData()
},[data])
    return (
        <View style={style.container}>
            <StatusBar />

            <View style={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:40}}>
                <View>
                    <Text style={style.header}>Hi user</Text>
                    <Text>200 List</Text>
                </View>
                <View>
                <Image
                source={{uri: 'https://res.cloudinary.com/agastyo-atallah-al-ardhi/image/upload/v1661524756/TodoApp/profile_qg5qen.svg'}}
                style={{width:50, height:50}}
                />
                </View>
            </View>
            <View style={{marginBottom:50}}>
                <View>
                    <TextInput
                        style={style.textInput}
                        placeholder="Search List..."
                        onChangeText={(value) => handleOnChange('searchList', value)}
                        value={form.searchList}
                    />
                </View>

                <View style={style.inputContainer}>
                        <View>
                            <TextInput
                                style={style.textsInput}
                                placeholder="Search List..."
                                onChangeText={(value) => handleOnChange('searchList', value)}
                                value={form.searchList}
                            />
                        </View>
                        <View>
                            <TodoCategory/>
                        </View>
                        <View>
                            <TodoStatus/>
                        </View>
                </View>

            </View>
            <View>
                <Text style={style.header}>List Category</Text>

                {/* <Animatable.View animation="lightSpeedIn" duration={400} style={style.card}>
                  <View>
                      <Text style={{fontWeight: 'bold', marginBottom: 5}}>Study-Golang</Text>
                      <Text style={style.cardDescription}>Learn Golang to Improve
                      fundamentals and familiarize with coding</Text>
                  </View>
                  <View style={{width: 50}}>
                      <TouchableOpacity style={style.CardTitle}>
                          <Text style={{fontSize: 10, fontWeight: 'bold', textAlign: 'center'}}>Study</Text>
                      </TouchableOpacity >
                      <TouchableOpacity style={style.Omark}>
                      </TouchableOpacity >
                  </View>
                </Animatable.View>
                <Animatable.View animation="lightSpeedIn" duration={700} style={style.card}>
                  <View>
                      <Text style={{fontWeight: 'bold', marginBottom: 5}}>Study-Golang</Text>
                      <Text style={style.cardDescription}>Learn Golang to Improve
                      fundamentals and familiarize with coding</Text>
                  </View>
                  <View style={{width: 50}}>
                      <TouchableOpacity style={style.CardTitle}>
                          <Text style={{fontSize: 10, fontWeight: 'bold', textAlign: 'center'}}>Study</Text>
                      </TouchableOpacity >
                      <TouchableOpacity style={style.Omark}>
                      </TouchableOpacity >
                  </View>
                </Animatable.View> */}
            </View>
            <FlatList
                  data={data}
                  key={item => item.index}
                  renderItem={({item,index}) => (
                <Animatable.View animation="lightSpeedIn" duration={index*400} style={{display:'flex',
                marginTop: 20,
                height: 90,
                width: 330,
                backgroundColor: (item.color),
                borderRadius: 5,
                flexDirection: 'row',
                justifyContent:'space-between',
                alignItems:'center',
                padding:20}}>
                  <View>
                      <Text style={{fontWeight: 'bold', marginBottom: 5}}>{item.name}</Text>
                      <Text style={style.cardDescription}>{item.description}</Text>
                  </View>
                  <View style={{width: 50}}>
                      <TouchableOpacity style={style.CardTitle}>
                          <Text style={{fontSize: 10, fontWeight: 'bold', textAlign: 'center'}}>Study</Text>
                      </TouchableOpacity >
                      <TouchableOpacity style={style.Omark}>
                      </TouchableOpacity >
                  </View>
                </Animatable.View>
                )}/>
        </View>
    );
}

// Create Variable for CSS
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  header: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  labelText: {
    color: 'grey',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    color: 'grey',
    padding: 10,
    borderColor: 'grey',
  },
  textsInput: {
    height: 40,
    width:100,
    borderWidth: 1,
    borderRadius: 5,
    // marginBottom: 12,
    color: 'grey',
    padding: 10,
    borderColor: 'grey',
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#FF5555',
    height: 40,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center'
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  card :{
    display:'flex',
    marginTop: 20,
    height: 90,
    width: 330,
    backgroundColor: `#DAEFFF`,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:20
  },
  cardDescription :{
    fontSize: 10,
    flexWrap: 'wrap',
    display: 'flex',
    width: 200,

  },
  CardTitle :{
    height: 15,
    width: 45,
    borderRadius: 5,
    backgroundColor: `#81C8FF`,
    marginBottom:10
  },
  Omark:{
    height: 25,
    width: 25,
    borderRadius: 50,
    backgroundColor: `#D9D9D9`,
  }
})
