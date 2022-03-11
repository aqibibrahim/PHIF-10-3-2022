import React, { useState,useEffect } from 'react';
import {  View, Text,Image,Dimensions, TouchableOpacity,FlatList, ScrollView,DeviceEventEmitter  } from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
import styles from './style';
import SweetAlert from 'react-native-sweet-alert';
import SunmiV2Printer from 'react-native-sunmi-v2-printer';
// import SunmiV2Printer from 'react-native-sunmi-inner-printer';
// let medData=[{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'}]
function Detail(props) {
    console.log(props.route.params.deatail.ContactNo)
    const [status, setStatus] = useState('');
    const [totalPrice, setotalPrice]=useState(0)
    const [selectedtabletData, setSelectedTabletData]=useState([])
    const [tabletData, setTabletData]=useState(props.route.params.deatail.AssignedDrugs)
    const [medData, setMetData]=useState([{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},
    {id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},{id:1,name:'Vitamin C',time:"1 X 1 / 30 Days",price:"30.000",currency:'LYD'},])

    useEffect(() => {
        listener = null;

        try {
          listener = DeviceEventEmitter.addListener('PrinterStatus', (action) => {
            switch (action) {
              case SunmiV2Printer.Constants.NORMAL_ACTION:
                setStatus(() => 'printer normal');
                break;
              case SunmiV2Printer.Constants.OUT_OF_PAPER_ACTION:
                setStatus(() => 'printer out out page');
                break;
              case SunmiV2Printer.Constants.COVER_OPEN_ACTION:
                setStatus(() => 'printer cover open');
                break;
              default:
                setStatus(() => 'printer status:' + action);
            }
          });
        } catch (e) {
          console.log(e);
        }

        return () => {
          if (listener) {
            listener.remove();
          }
        };
      }, []);
    const _renderMeds = (item, index) => {
    return (
        <>
        <TouchableOpacity onPress={() => {
                let array = [...tabletData];
                if (array[index].selected) {
                        console.log(array[index].Price)
                        array[index] = { ...array[index], selected: false }
                        let tempPrice = totalPrice-array[index].Price
                        setotalPrice(tempPrice)

                } else {
                        array[index] = { ...array[index], selected: true }
                        let tempPrice = totalPrice+array[index].Price
                        setotalPrice(tempPrice)
                }
                setTabletData(array)
            }
            }>
        <View style={{borderWidth:1,borderColor:'#e8e8e8',padding:'5%',borderRadius:10,marginBottom:'5%',backgroundColor:item?.selected ? "#2972FE":"white"}}>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'1%'}}>
        <View>
        <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{item.DrugName}</Text>
        </View>
        <View>
        <Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>{"LYD"}</Text>
        </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginVertical:'1%'}}>
        <View>
        <Text>{item.Description}</Text>
        </View>
        <View style={{marginRight:'9%'}}>
        <Text>{item.Price}</Text>
        </View>
        </View>

        </View>
        </TouchableOpacity>
        </>
    )
    }

    const handleCointinue = () =>{
        let hobbiesArray = []
        let hobbies = []

        tabletData.map((item) => {
            if (item.selected) {
                hobbiesArray.push(item.DrugId)
                hobbies.push(item)

            }
        })
        setSelectedTabletData(hobbies)
        console.log(hobbiesArray.toString());
        if(hobbiesArray.length>0)
        {
        fetch(`http://148.251.211.104:9098/AssignedDrugsApp/CreateDrugTransection?AssuredID=${props.route.params.deatail.AssuredID}&DrugIds=${hobbiesArray.toString()}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            if(json == true){
                SweetAlert.showAlertWithOptions({
                    title: '',
                    subTitle: '',
                    confirmButtonTitle: 'OK',
                    confirmButtonColor: '#000',
                    otherButtonTitle: 'Cancel',
                    otherButtonColor: '#dedede',
                    style: 'success',
                    cancellable: true
                  },
                    callback => console.log('callback'));
                print(hobbies);
            }

        })
        .catch((error) => {
          console.error(error);
        });
        }
    }

    const print = async (data) => {

      for (var i in data) {
        // console.log(orderList[i]);
        // console.log(columnWidth);
        // console.log(columnAliment);
        // var p = tabletData[i.selected];
          var lines = [i.DrugName,i.Description+"",i.Price+""]
          // SunmiInnerPrinter.printColumnsText(lines,widths,aligns)
          console.log(lines);
        // await SunmiV2Printer.printColumnsText(
        //   lines,
        //   columnWidth,
        //   columnAliment,
        // );

    }
        let logo =
          'data:image/png;base64,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';
        //ensure the base64 string without URI Scheme
        let logobase64 = logo.replace('data:image/png;base64,', '');
        let orderList = [
          ['2020-11-25 15:00:00', '', ''],
          ['Some item x 1', '', ''],
          ['', '', '$100'],
          ['2020-11-25 15:00:00', '', ''],
          ['Some item x 1', '', ''],
          ['', '', '$100'],
        ];
        let columnAliment = [0, 1, 2];
        let columnWidth = [15, 25, 5];
        try {
          //set aligment: 0-left,1-center,2-right
          await SunmiV2Printer.setAlignment(1);

          //图片bitmap对象(最大宽度384像素，超过无法打印并且回调callback异常函数)
          await SunmiV2Printer.printBitmap(
            logobase64,
            384 /*width*/,
            380 /*height*/,
          );
          //SunmiV2Printer.commitPrinterBuffer();

          await SunmiV2Printer.setFontSize(50);
          await SunmiV2Printer.printOriginalText(`${props.route.params.deatail.AssuredName}\n`);
          await SunmiV2Printer.setFontSize(40);
          await SunmiV2Printer.printOriginalText(`${props.route.params.deatail.ContactNo}\n`);
          await SunmiV2Printer.setFontSize(20);
          await SunmiV2Printer.setAlignment(0);
          await SunmiV2Printer.printOriginalText('Receipt ID: 1234567890\n');
          await SunmiV2Printer.printOriginalText(`Date: ${props.route.params.deatail.EndDate}\n`);
          await SunmiV2Printer.printOriginalText(
            '===============================\n',
          );
          await SunmiV2Printer.setFontSize(22);
          selectedtabletData.map((val)=>{
            console.log(val)
            var lines = [val.DrugName,val.Description+"",val.Price+""]
            console.log(lines);
             SunmiV2Printer.printColumnsText(
              lines,
              columnWidth,
              columnAliment,
            );
          })
          // for (var i in selectedtabletData) {
          //     console.log(orderList[i]);
          //     console.log(columnWidth);
          //     console.log(columnAliment);
          //     // var p = tabletData[i.selected];
          //       var lines = [i.DrugName,i.Description+"",i.Price+""]
          //       // SunmiInnerPrinter.printColumnsText(lines,widths,aligns)


          // }
          await SunmiV2Printer.setFontSize(20);
          await SunmiV2Printer.printOriginalText(
            '===============================\n',
          );
          await SunmiV2Printer.setAlignment(2);
          await SunmiV2Printer.setFontSize(30);
          await SunmiV2Printer.printOriginalText(`Total: $ ${totalPrice}\n`);
          await SunmiV2Printer.setFontSize(20);
          await SunmiV2Printer.printOriginalText(
            '===============================\n',
          );
          await SunmiV2Printer.printOriginalText('\n\n');
        } catch (e) {
         alert(e);
        }
      };
    return (
        <>
        <View style={{backgroundColor:"white",height:SCREEN_HEIGHT,width:SCREEN_WIDTH}}>
        <ScrollView contentContainerStyle={{paddingBottom:'10%'}}>
          <Image style={{width:200,height:40,marginVertical:'5%',alignSelf:'center'}} source={require("../../assets/images/header2.png")}/>
          <View style={{marginHorizontal:'5%'}}>
          <View style={{marginTop:'1%'}}>
         <Text style={styles.itemText}>Patient Information</Text>
        </View>
        <View style={{marginVertical:'3%',borderBottomWidth:2,borderColor:'#e8e8e8'}}>
         <Text style={styles.itemText4}>Name: {props.route.params.deatail.AssuredName}</Text>
        </View>
        <View style={{marginVertical:'3%',borderBottomWidth:2,borderColor:'#e8e8e8'}}>
         <Text style={styles.itemText4}>Mobile No: {props.route.params.deatail.ContactNo}</Text>
        </View>
        <View style={{marginVertical:'3%',borderBottomWidth:2,borderColor:'#e8e8e8'}}>
         <Text style={styles.itemText4}>Claim Status: {props.route.params.deatail.StatusID == 0 ? "Complete" : "Pending"}</Text>
        </View>
        <View style={{marginTop:'2%'}}>
         <Text style={styles.itemText}>Select Drugs</Text>
        </View>
        <View style={{height:SCREEN_HEIGHT*0.33,marginVertical:'1.5%'}}>
        <FlatList
        nestedScrollEnabled={true}
        contentContainerStyle={{marginHorizontal:'2.5%'}}
        data={tabletData}
        renderItem={({ item, index }) => _renderMeds(item, index)} />
        </View>
        <View style={{marginVertical:'3%',alignItems:'center',borderBottomWidth:2,borderColor:'#e8e8e8'}}>
         <Text style={[styles.itemText4,{fontWeight:'600'}]}>Total Amount: LYD {totalPrice}</Text>
        </View>
        <View style={{marginTop:'1%'}}>
        <TouchableOpacity onPress={()=>handleCointinue()} style={styles.btnPrimary}>
                        <Text style={styles.itemText2}>Submit</Text>
        </TouchableOpacity>
        </View>
        <View style={{marginVertical:'3%',alignItems:'center',justifyContent:'center'}}>
      <Text style={styles.itemText3}>Monday, March 25 2022</Text>
      <Text>{status}</Text>
      </View>
        </View>
        </ScrollView>
        </View>
        </>
    );
}

export default Detail;
