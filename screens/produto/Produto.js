import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Page from '../../page/Page';
import styles from './produtoStyles'


const Quantidade = (props) => {

    const [qnt, setQnt] = useState(0)
    const [qntCarrinho, setQntCarrinho] = useState(0)
    const [prodNoCarrinho, setProdNoCarrinho] = useState(false)

    const [load, setLoad] = useState(false)
    const tam = props.tam
    const produto = props.produto
    const cor = props.cor
    const carrinho = props.carrinho ? props.carrinho : null

    useEffect(() => {
        setQnt(0)
    }, [cor])


    useEffect(() => {
        if (carrinho.results) {
            carrinho.results[0].itens.find((produto) => {
                if (produto.sku === tam.codigo_base) {
                    setQntCarrinho(produto.quantidade)
                    setQnt(produto.quantidade)
                    setProdNoCarrinho(true)
                }
            })
        }
    }, [carrinho, cor])

    useEffect(() => {
        if (carrinho) {

            const novoCarrinho = async () => {

                try {
                    await AsyncStorage.setItem('@br-app:pedido', JSON.stringify(carrinho))
                    setLoad(false)
                } catch (error) {
                    console.log('NÃO FOI POSSIVEL BAIXAR OS PEDIDOS', error)
                }
            }

            if (!prodNoCarrinho && qnt > 0 && qnt !== qntCarrinho) {
                carrinho.results[0].itens.push({
                    "descricao": `${produto.descricao} ${cor.descricao} ${tam.descricao}`,
                    "preco": produto.preco_lista,
                    "quantidade": qnt,
                    "sku": tam.codigo_base
                })
                novoCarrinho()
                setProdNoCarrinho(true)
            }

            if (prodNoCarrinho && qnt !== qntCarrinho) {
                carrinho.results[0].itens.find((produto, id) => {
                    if (produto.sku === tam.codigo_base) {
                        if (qnt === 0) {
                            carrinho.results[0].itens.splice(id, 1)
                            setProdNoCarrinho(false)
                        } else {
                            carrinho.results[0].itens[id].quantidade = qnt
                            setProdNoCarrinho(false)
                        }
                    }
                    novoCarrinho()
                })
            }
        }
    }, [qnt])



    return (
        <View style={styles.linhaProduto}>
            <Text style={styles.linhaItem}>{tam.descricao}</Text>
            <View style={styles.selectQnt}>
                <TouchableOpacity style={styles.btnQnt} onPress={() => {
                    setQnt(qnt > 0 ? !load ? qnt - 1 : qnt : 0)
                    setLoad(true)
                }}>
                    <Icon name='minus' color='#000' size={10} />
                </TouchableOpacity>

                <Text style={styles.qnt}>{qnt}</Text>
                <TouchableOpacity style={styles.btnQnt} onPress={() => {
                    setQnt(qnt < tam.saldo_3 ? !load ? qnt + 1 : qnt : tam.saldo_3)
                    setLoad(true)
                }}>
                    <Icon name='plus' color='#000' size={10} />
                </TouchableOpacity>
            </View>
            <Text style={styles.linhaItem}>{tam.saldo_3}</Text>
        </View>
    )
}

export default function Produto({ route, navigation }) {

    const produto = route.params.results[0]
    const especTam = []
    const itensId = []
    const [cor, setCor] = useState(produto.itens[0])
    const [imagem, setImagem] = useState(1)
    const [carrinho, setCarrinho] = useState([])
    const [imgError, setImgError] = useState(false)
    const [corProduto, setCorProduto] = useState(0)

    const img = [
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-1.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-2.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-3.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-4.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-5.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-6.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-7.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-8.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-9.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-10.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-11.jpg`,
        `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-12.jpg`,
    ]


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

    useEffect(() => {
        produto.itens.map((cor, id) => {
            if (cor.itens.length > 0) {
                itensId.push(id)
            }
            if (itensId.length > 0) {
                setCorProduto(itensId[0])
            }
        })

    }, [produto])


    produto.itens.map((tamanhos) => {
        tamanhos.itens.map((tamanho, id) => {
            if (!especTam.find((tam) => tam === tamanho.descricao)) {
                especTam.push(tamanho.descricao)

            }
        })
    })
    especTam.sort()


    return (
        <Page navigation={navigation}>
            <ScrollView>
                <View style={styles.produto}>
                    <View style={styles.miniImgs}>
                        {img.map((imagem, id) => {
                            return (
                                <TouchableOpacity key={id}
                                 onPress={() => {
                                    setImagem(id + 1)
                                    setImgError(false)
                                }}>
                                    <View>
                                        <Image
                                            style={styles.miniImg}
                                            source={{ uri: imagem }}
                                            onError={({ currentTarget }) => {
                                                ;
                                            }} />
                                    </View>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <View style={styles.produtoContent}>
                        <Image
                            style={styles.img}
                            source={imgError || !produto ? require(`../../assets/produto-sem-imagem.jpg`)
                                : { uri: `https://clienteportal.brms.com.br/images/produto/${produto.codigo + produto.itens[corProduto].codigo}-${imagem}.jpg` }}
                            onError={() => setImgError(true)} />

                        <View style={styles.corButtons}>
                            {produto.itens.map((cor, id) => {
                                if (cor.itens.length > 0) {
                                    return (
                                        <TouchableOpacity key={id} style={styles.corBtn} onPress={() => {
                                            setCorProduto(id)
                                            setImagem(1)
                                            setCor(produto.itens[id])
                                        }}>
                                            <Text style={styles.corBtnText}>{cor.descricao}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })}
                        </View>
                        <Text style={styles.prodDescricao}>{produto.descricao} {cor.descricao}</Text>
                        <View style={styles.allValores}>
                            <View style={styles.valores}>
                                <Text style={styles.valorText}>Valor do Produto:</Text>
                                <Text>R${String(produto.preco_lista?.toFixed(2)).replace('.', ',')}</Text>
                            </View>
                            <View style={styles.valores}>
                                <Text style={styles.valorText}>Valor do ICMS ST:</Text>
                                <Text>R${String(0.0.toFixed(2)).replace('.', ',')}</Text>
                            </View>
                            <View style={styles.valores}>
                                <Text style={styles.valorText}>Valor do IPI:</Text>
                                <Text>R${String(0.0.toFixed(2)).replace('.', ',')}</Text>
                            </View>
                            <View style={styles.valores}>
                                <Text style={styles.valorText}>Valor do Produto + Impostos:</Text>
                                <Text>R${String(produto.preco_lista?.toFixed(2)).replace('.', ',')}</Text>
                            </View>
                            <View style={styles.valores}>
                                <Text style={styles.valorText}>Preço Sugerido:</Text>
                                <Text>R${String(produto.preco_sugerido?.toFixed(2)).replace('.', ',')}</Text>
                            </View>
                        </View>
                        <View style={styles.linhaProduto}>
                            <Text style={styles.linhaItem}>TAMANHOS</Text>
                            <Text style={styles.linhaItem}>{cor.descricao}</Text>
                            <Text style={styles.linhaItem}>ESTOQUE</Text>
                        </View>


                        {cor.itens.map((tam, id) => {
                            return (
                                <Quantidade tam={tam} cor={cor} produto={produto} carrinho={carrinho} key={id} />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </Page >
    );
}

