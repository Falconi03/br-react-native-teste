import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Page from '../../page/Page';
import styles from './carrinhoStyle'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Context } from '../../context/Context';

const Quantidade = (props) => {
    const [qnt, setQnt] = useState(props.qnt)
    const [load, setLoad] = useState(false)
    const [imgError, setImgError] = useState(false)
    const { carrinho } = useContext(Context)
    
    
    /* const carrinho = props.carrinho */
    const id = props.id
    const itens = props.itens


    const novoCarrinho = async () => {

        try {
            await AsyncStorage.setItem('@br-app:pedido', JSON.stringify(carrinho))
            setLoad(false)
            props.getCarrinho()
        } catch (error) {
            console.log('NÃO FOI POSSIVEL BAIXAR OS PEDIDOS', error)
        }
    }

    useEffect(() => {
        if (carrinho.results) {

            if (qnt === 0) {
                carrinho.results[0].itens.splice(id, 1)
            } else {
                carrinho.results[0].itens[id].quantidade = qnt
                props.getCarrinho()

            }
            novoCarrinho()

        }
    }, [qnt])

    const del= ()=>{
        carrinho.results[0].itens.splice(id, 1)
        novoCarrinho()
    }

    return (
        <View style={styles.produto}>
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
                        <TouchableOpacity style={styles.btnQnt} onPress={() => {
                            setQnt(qnt > 0 ? !load ? qnt - 1 : qnt : 0)
                            setLoad(true)
                        }}>
                            <Icon name='minus' color='#000' size={10} />
                        </TouchableOpacity>
                        <Text style={styles.qnt}>{itens.quantidade}</Text>
                        <TouchableOpacity style={styles.btnQnt} onPress={() => {
                            setQnt(!load ? qnt + 1 : qnt)
                            setLoad(true)
                        }}>
                            <Icon name='plus' color='#000' size={10} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.btnExcluir} onPress={()=> del()}>
                        <Icon name='trash-alt' color='#ff0000' size={10} />
                        <Text>Excluir</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


export default function Carrinho({ navigation }) {

    const {carrinho, setCarrinho } = useContext(Context)
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
                                    <Quantidade
                                        qnt={itens.quantidade}
                                        itens={itens}
                                        key={id}
                                        id={id}
                                        getCarrinho={getCarrinho}
                                        /* carrinho={carrinho} */ />
                                )
                            })}
                            <View style={styles.total}>
                                <Text style={styles.preco}>SUBTOTAL: R$ {String(total.toFixed(2)).replace('.', ',')}</Text>
                                <Text style={styles.preco}>TOTAL: R$ {String(total.toFixed(2)).replace('.', ',')}</Text>
                            </View>
                            <View style={styles.finalizacao}>
                                <TouchableOpacity style={styles.btnAlterar}><Text style={{ color: '#fff' }}>Alterar detalhes do orçamento</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.btnFechar}><Text style={{ color: '#fff' }}>Fechar orçamento</Text></TouchableOpacity>
                                <TouchableOpacity style={styles.btnApagar}><Text style={{ color: '#fff' }}>Apagar orçamento</Text></TouchableOpacity>
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
