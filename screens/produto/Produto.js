import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Page from '../../page/Page';
import styles from './produtoStyles'

export default function Produto({ route, navigation }) {

    const produto = route.params.results[0]

    console.log(produto)

    return (
        <Page navigation={navigation}>
            <ScrollView>
                <View style={styles.produto}>
                    <Image
                        style={styles.img}
                        source={require(`../../assets/produto-sem-imagem.jpg`)}
                    /* onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = `../../assets/produto-sem-imagem.jpg`;
                    }} */ />
                    <View style={styles.corButtons}>
                        {produto.itens.map((cor) => {
                            return (
                                <TouchableOpacity style={styles.corBtn}>
                                    <Text style={styles.corBtnText}>{cor.descricao}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    <Text style={styles.prodDescricao}>{produto.descricao}</Text>
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
                </View>
            </ScrollView>
        </Page>
    );
}

