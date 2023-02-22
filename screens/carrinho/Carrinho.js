import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Page from '../../page/Page';
import styles from './carrinhoStyle'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Carrinho({ navigation }) {

    const [carrinho, setCarrinho] = useState([])
    const [imgError, setImgError] = useState(false)
    let total = 0


    const getCarrinho = async () => {

        try {
            const response = JSON.parse(await AsyncStorage.getItem('@br-app:pedido'))
            setCarrinho(response)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getCarrinho()
    }, [])


    return (

        <Page navigation={navigation}>
            <ScrollView>
                <View style={styles.Carrinho}>
                    <Text style={styles.title}>MEU CARRINHO</Text>
                    {carrinho.results ?
                        <View style={styles.produtos}>
                            {carrinho.results[0].itens.map((itens, id) => {
                                total += itens.preco * itens.quantidade
                                return (
                                    <View key={id} style={styles.produto}>
                                        <Image
                                            style={styles.img}
                                            source={imgError ? require(`../../assets/produto-sem-imagem.jpg`)
                                                : { uri: `https://clienteportal.brms.com.br/images/produto/${itens.sku.substring(0, 17)}-1.jpg` }}
                                            onError={() => setImgError(true)} />
                                        <View style={styles.info}>
                                            <Text style={styles.descricao}>{itens.descricao}</Text>
                                            <Text style={styles.codigo}>Código: {itens.sku}</Text>
                                            <Text style={styles.preco}>R$ {String(itens.preco.toFixed(2)).replace('.', ',')}</Text>
                                            <View style={styles.btns}>
                                                <View style={styles.selectQnt}>
                                                    <TouchableOpacity style={styles.btnQnt}>
                                                        <Icon name='minus' color='#000' size={10} />
                                                    </TouchableOpacity>
                                                    <Text style={styles.qnt}>{itens.quantidade}</Text>
                                                    <TouchableOpacity style={styles.btnQnt}>
                                                        <Icon name='plus' color='#000' size={10} />
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity style={styles.btnExcluir}>
                                                    <Icon name='trash-alt' color='#ff0000' size={10} />
                                                    <Text>Excluir</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })}
                            <View style={styles.total}>
                                <Text style={styles.preco}>SUBTOTAL: R$ {String(total.toFixed(2)).replace('.', ',')}</Text>
                                <Text style={styles.preco}>TOTAL: R$ {String(total.toFixed(2)).replace('.', ',')}</Text>
                            </View>
                            <View style={styles.finalizacao}>
                                <TouchableOpacity style={styles.btnAlterar}><Text style={{color:'#fff'}}>Alterar detalhes do orçamento</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.btnFechar}><Text style={{color:'#fff'}}>Fechar orçamento</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.btnApagar}><Text style={{color:'#fff'}}>Apagar orçamento</Text></TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View>
                            <Text style={styles.title}>SEU CARRINHO ESTA VAZIO</Text>
                        </View>}
                </View>
            </ScrollView>
        </Page>

    );
}
