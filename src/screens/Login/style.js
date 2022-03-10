import { StyleSheet } from "react-native";


export default StyleSheet.create({
    containerStyle: {
        height: 55,
        marginBottom: 0,
    },
    inputContainerStyle: {
        borderBottomWidth: 0,
        backgroundColor: '#f6f6f6',
        borderRadius: 5,
        height: 50,
    },
    inputStyle: {
        height: 55,
        // textAlignVertical: "top",
        fontSize: 12,
        // fontFamily: themeStyle.FONT_REGULAR,
        marginLeft: '2.5%'
    },
    btnPrimary: {
        height: 51,
        borderRadius: 25,
        backgroundColor:'#2cb279',
        justifyContent:'center',
        alignItems:'center',
        margin: "2.5%",
        marginTop: '2.5%',
        paddingHorizontal: "10%",
    },
    itemText2: {
        fontSize: 20,
        // fontFamily: themeStyle.FONT_REGULAR,
        color: 'white',
    },
    itemText: {
        fontSize: 18,
        // fontFamily: themeStyle.FONT_REGULAR,
        color: '#2cb279',
        fontWeight:'500'
    },
    itemText1: {
        fontSize: 15,
        // fontFamily: themeStyle.FONT_REGULAR,
        color: '#2cb279',
        fontWeight:'500'
    },
})