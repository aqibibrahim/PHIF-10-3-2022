import React, { useState } from 'react';
import {  View, Text,Image,Dimensions, TouchableOpacity,  Linking,} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import { Input } from 'react-native-elements'
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';

import axios from 'axios';
function Search() {
  const onSuccess=(e)=> {
    console.log(e.data)
    setInputSearch(e.data)
    setShowQr(false)
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  }
    const navigation = useNavigation();
    const [showQr,setShowQr]=useState(false)
    const [inputSearch,setInputSearch]=useState("")
    const handleCointinue = () =>{
      if(inputSearch.length)
      {
        fetch(`http://148.251.211.104:9098/AssignedDrugsApp/GetAssignedDrugsandPersonDetailsByAssuredID?AssuredID=${inputSearch}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
           navigation.navigate("Detail",{deatail:json});

        })
        .catch((error) => {
          console.error(error);
        });
        // alert(inputSearch)
        // https://demo.utec.com.ly/AssignedDrugsApp/GetAssignedDrugsandPersonDetailsByAssuredID?AssuredID=abc-2157
        // https://weatherapi-com.p.rapidapi.com/ip.json
        // axios.get('http://148.251.211.104:9098/AssignedDrugsApp/GetAssignedDrugsandPersonDetailsByAssuredID?AssuredID=abc-2157')
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

      }
      else
      {

      }
    }
    return (
        <>
        {

          showQr ? 
          <QRCodeScanner
          onRead={(e)=>onSuccess(e)}
          topContent={
            <Text style={styles.centerText}> 
            On successfull scan there will be a vibration to close the scanner press done button on bottom.
            </Text>
          }
          bottomContent={
            <TouchableOpacity onPress={()=>showQr(false)} style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          }
        />:
<View style={{backgroundColor:"white",height:SCREEN_HEIGHT,width:SCREEN_WIDTH}}>
          <Image style={{width:200,height:40,marginVertical:'10%',alignSelf:'center'}} source={require("../../assets/images/header2.png")}/>
          <View style={{marginHorizontal:'5%'}}>
          <View style={{marginVertical:'5%',}}><Text style={{fontWeight:'bold',fontSize:20,color:'black'}}>Welcome <Text style={{fontWeight:'500',fontSize:20,color:'black'}}>Medwork Pharmacy</Text></Text></View>
          <View style={{marginTop:'5%'}}>
         <Text style={styles.itemText}>Please Enter the Assured ID OR Scan QR code</Text>
        </View>
          <View style={{marginVertical:'5%',flexDirection:'row',marginLeft:'-3.5%' }}>
          <View style={{flex:0.88}}>
          <Input
                                                placeholder="Search ID"
                                                value={inputSearch}
                                                containerStyle={styles.containerStyle}
                                                onChangeText={(e) => setInputSearch(e)}
                                                placeholderTextColor={'#bfbfbf'}
                                                inputContainerStyle={styles.inputContainerStyle}
                                                inputStyle={styles.inputStyle} /></View>
            <View style={{flex:0.17}}><TouchableOpacity onPress={()=>setShowQr(true)}><Image style={{width:50,height:50}} source={require("../../assets/images/qr.png")}/></TouchableOpacity></View>
            
           
            </View>
        <View style={{marginTop:'10%'}}>

        <TouchableOpacity onPress={() => { handleCointinue() }} style={styles.btnPrimary}>
                        <Text style={styles.itemText2}>Find</Text>
        </TouchableOpacity>
        </View>
        </View>

        </View>
        }
       
        
        </>
    );
}

export default Search;
