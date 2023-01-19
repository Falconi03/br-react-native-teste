import { StyleSheet } from "react-native";

const menuStyle = StyleSheet.create({
    Menu:{
        width: '100%',
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        position: 'absolute',
        bottom: 0,
    },
    menuBtn:{
        alignItems: 'center',
    },
    menuText:{
        color:'#fff',
        fontSize: 12
    }
})

export default menuStyle