import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const CategoryDropdown = () => {
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

        const res = await axios.get('https://api.kontenbase.com/query/api/v1/dc6d77a1-6f9f-4208-a95a-afd3b4216575/category?$lookup=*', config);
        setData(res.data)
        setDataLoading(false)          
        
      } catch (error) {
        console.log(error);
        setDataLoading(false)
      }
    }
    
    React.useEffect(()=> {
      getData()
    },[data])
    // const stamp = res.data.title
    const datas = data.map((item) => {
      return {label: item.name, value: item.name}
    })

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: '#FF5555' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={datas}
        search
        width={'100%'}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Category' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
          />
    </View>
  );
};

export default CategoryDropdown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom : 15,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'grey',
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
});