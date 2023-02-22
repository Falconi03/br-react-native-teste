import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import style from './menuStyle'

export default function Menu({ navigation }) {



    return (
        <View style={style.Menu}>
            <TouchableOpacity style={style.menuBtn} onPress={() => navigation.navigate('Home')}>
                <Icon style={style.icon} name='th-large' color='#fff' size={20} />
                <Text style={style.menuText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.menuBtn} onPress={() => navigation.navigate('User')}>
                <Icon style={style.icon} name='user' color='#fff' size={20} />
                <Text style={style.menuText}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.menuBtn} onPress={() => navigation.navigate('Loja')}>
                <Icon style={style.icon} name='store' color='#fff' size={20} />
                <Text style={style.menuText}>Loja</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.menuBtn} onPress={() => navigation.navigate('Carrinho')}>
                <Icon style={style.icon} name='shopping-cart' color='#fff' size={20} />
                <Text style={style.menuText}>Carrinho</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.menuBtn} onPress={() => navigation.navigate('Plus')}>
                <Icon style={style.icon} name='bars' color='#fff' size={20} />
                <Text style={style.menuText}>Mais</Text>
            </TouchableOpacity>
        </View>
    )

}