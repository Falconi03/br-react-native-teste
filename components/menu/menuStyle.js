import { StyleSheet } from "react-native";

const menuStyle = StyleSheet.create({
    Menu:{
        width: '100%',
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 10,
        paddingBottom: 20,
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