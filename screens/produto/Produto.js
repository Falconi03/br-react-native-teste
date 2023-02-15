import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Page from '../../page/Page';
import styles from './produtoStyles'


const Quantidade = (props) => {

    const [qnt, setQnt] = useState(0)
    const tam = props.tam

    return (
        <View style={styles.linhaProduto}>
            <Text style={styles.linhaItem}>{tam.descricao}</Text>
            <View style={styles.selectQnt}>
                <TouchableOpacity style={styles.btnQnt} onPress={() => setQnt(qnt > 0 ? qnt - 1 : 0)}>
                    <Icon name='minus' color='#000' size={10} />
                </TouchableOpacity>
                <Text style={styles.qnt}>{qnt}</Text>
                <TouchableOpacity style={styles.btnQnt} onPress={() => setQnt(qnt < tam.saldo_3 ? qnt + 1 : tam.saldo_3)}>
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
    const [cor, setCor] = useState(produto.itens[0])


    produto.itens.map((tamanhos) => {
        tamanhos.itens.map((tamanho, id) => {
            if (!especTam.find((tam) => tam === tamanho.descricao)) {
                especTam.push(tamanho.descricao)

            }
        })
    })
    especTam.sort()

    console.log(produto)

    return (
        <Page navigation={navigation}>
            <ScrollView>
                <View style={styles.produto}>
                    <Image
                        style={styles.img}
                        source={require(`../../assets/produto-sem-imagem.jpg`)}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `../../assets/produto-sem-imagem.jpg`;
                    }} />
                    <View style={styles.corButtons}>
                        {produto.itens.map((cor, id) => {
                            if (cor.itens.length > 0) {
                                return (
                                    <TouchableOpacity style={styles.corBtn} onPress={() => setCor(produto.itens[id])}>
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


                    {cor.itens.map((tam) => {
                        return (
                            <Quantidade tam={tam} />
                        )
                    })}
                </View>
            </ScrollView>
        </Page >
    );
}

