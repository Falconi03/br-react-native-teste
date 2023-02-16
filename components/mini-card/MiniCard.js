import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import style from './miniCardStyle'

export default function MiniCard(props) {

    const produto = props.produto

    const getProduto = async () => {
        try {
            const response = JSON.parse(await AsyncStorage.getItem(`@br-produto-${String(produto.id)}`))
            const results = response.results
            props.navigation.navigate('Produto',{results})

        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <View style={style.MiniCard}>
            <TouchableOpacity onPress={()=> getProduto()}>
                <Image
                    style={style.img}
                    source={require(`../../assets/produto-sem-imagem.jpg`)}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `../../assets/produto-sem-imagem.jpg`;
                    }} />
                <View style={style.conteudo}>
                    <Text style={style.descricao}>{produto.descricao.slice(0, 30)}</Text>
                    <View style={style.preco}>
                        <Text style={style.precoText}>Preço:</Text>
                        <Text style={style.precoText}>R${produto.preco_lista}</Text>
                        <Text style={style.precoText}>Preço Sugerido:</Text>
                        <Text style={style.precoText}>R${produto.preco_sugerido}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )

}