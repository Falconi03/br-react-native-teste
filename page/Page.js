import React from "react";
import { View } from 'react-native';

import style from './pageStyle'
import Menu from "../components/menu/Menu";
import Header from "../components/header/Header";

export default function Page(props) {

    return(
        <View style={style.Page}>
            <Header/>
            {props.children}
            <Menu navigation={props.navigation}/>
        </View>
    )

}