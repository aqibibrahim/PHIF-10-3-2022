import React, { useState } from 'react';
import {  View, Text,Image,Dimensions,TextInput, Touchable, TouchableOpacity  } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import { Input } from 'react-native-elements'
import styles from './style';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const navigation = useNavigation();
  const [inputSearch,setInputSearch]=useState("")
const handleCointinue = () =>{
  if(inputSearch!=="")
  {
    // alert(inputSearch)
    // navigation.navigate("Search");

  }
  else
  {
    
  }
}
    return (
        <>
        <View style={{backgroundColor:"white",height:SCREEN_HEIGHT}}>
          <Image style={{width:'100%',height:80,marginVertical:'10%'}} source={require("../../assets/images/header.png")}/>
          <View style={{marginVertical:'5%',justifyContent:'center',alignItems:'center'}}><Text style={{fontWeight:'bold',fontSize:50,color:'black'}}>Log In</Text></View>
          <View style={{marginHorizontal:'5%'}}>
          <View style={{marginVertical:'5%'}}>
          <Input
                                                placeholder="Email"
                                                // value={caption}
                                                containerStyle={styles.containerStyle}
                                                // onChangeText={(e) => this.setState({ caption: e })
                                                placeholderTextColor={'#bfbfbf'}
                                                inputContainerStyle={styles.inputContainerStyle}
                                                inputStyle={styles.inputStyle} />
                                        </View>
         <View>
          <Input
                                                placeholder="Password"
                                                value={inputSearch}
                                                containerStyle={styles.containerStyle}
                                                onChangeText={(e) =>setInputSearch(e) }
                                                placeholderTextColor={'#bfbfbf'}
                                                inputContainerStyle={styles.inputContainerStyle}
                                                inputStyle={styles.inputStyle} />
      <View style={{position:'absolute',right:40,top:12}}>
      <Text style={styles.itemText1}>Show</Text>
      </View>
        </View>
        <View style={{marginTop:'10%'}}>

        <TouchableOpacity onPress={() => { navigation.navigate("Search") }} style={styles.btnPrimary}>
                        <Text style={styles.itemText2}>Log In</Text>
        </TouchableOpacity>
        </View>

       <View style={{marginVertical:'5%',alignItems:'center',justifyContent:'center'}}>
      <Text style={styles.itemText}>Forgot your password?</Text>
      </View>
        </View>

        </View>
        </>
    );
}

export default Login;
