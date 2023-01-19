import React from 'react'
import { View, Text, Image } from 'react-native'

import style from './headerStyle'

export default function Header() {
    return (
        <View style={style.Header}>
            <Image
                style={style.logo}
                source={require('../../assets/br_branco-semfundo.png')} />
            <Text style={style.title}>BR Motorsport-Portal do Cliente</Text>
        </View>
    )

}

