import { StyleSheet } from "react-native";

const loadStyles = StyleSheet.create({
    Load: {
        backgroundColor: '#2d353c',
        flex: 1,
        alignItems:'center', 
        justifyContent:'center',       
    },
    loadText:{
        color: 'white',
        fontWeight: 'bold'
    },
    loading: {
        alignSelf: 'center',
        justifyContent: 'center',
    }
})
export default loadStyles