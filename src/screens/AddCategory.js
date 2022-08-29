import { StatusBar } from "expo-status-bar";
import { Dropdown } from 'react-native-element-dropdown';
import React,{useState,useEffect} from "react";
import {Image, View, StyleSheet, Text, TextInput, TouchableOpacity,FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Directions } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';


export default function AddCategory ({navigation})  {
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);



  var ColorCode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
 


  const [form, setForm] = useState({
      name:'',
      color: ColorCode
  });


    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (name, value) => {
      setForm({
          ...form,
          [name]: value,
      });
  };


  const handleOnPress = async () =>{
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

        const body = JSON.stringify(form);
        setIsLoading(true)
        const response = await axios.post('https://api.kontenbase.com/query/api/v1/dc6d77a1-6f9f-4208-a95a-afd3b4216575/category', body, config);
        console.log(response);           

        setIsLoading(false)
        alert('Category Added Successfully')

      } catch (error) {
          console.log(error);
          alert(error.response.data.message);
          setIsLoading(false)
      }
  }

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

        const res = await axios.get('https://api.kontenbase.com/query/api/v1/dc6d77a1-6f9f-4208-a95a-afd3b4216575/category', config);
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

            <View style={{marginBottom:50}}>

            <Text style={style.header}>Add List</Text>
                <View>
                    <TextInput
                        style={style.textInput}
                        placeholder="Name"
                        onChangeText={(value) => handleOnChange('name', value)}
                        value={form.name}
                    />
                </View>

                <TouchableOpacity style={style.button} onPress={handleOnPress}>
                    {
                        isLoading ? <Text style={style.textButton}>Add Category ...</Text> : <Text style={style.textButton}>Add Category</Text>
                    }
                </TouchableOpacity>

            </View>
            <View>
                <Text style={style.header}>List Category</Text>
            </View>
            <FlatList
                  numColumns={3}
                  data={data}
                  key={item => item.index}
                  renderItem={({item}) => (
                      <Animatable.View animation="slideInLeft" style={{backgroundColor:(item.color), width:60, height:20, marginEnd:5, borderRadius:3, marginBottom:5}}>
                          <Text style={{color:'white', textAlign:'center'}}>
                              {item.name}
                          </Text>
                      </Animatable.View>
                  )}
                  refreshing={dataLoading}
                  onRefresh={getData}
                />            
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
    marginBottom: 15
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
    height: 120,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
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
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
})
