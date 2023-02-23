
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MiniCard from '../../components/mini-card/MiniCard';
import Page from '../../page/Page';
import styles from './lojaStyle'
import { useScrollToTop } from '@react-navigation/native';
import { useRef } from 'react';

export default function Loja({ navigation }) {

    const [produtos, setProdutos] = useState([])
    const [num, setNum] = useState([0, 21])
    const [search, setSearch] = useState('')
    const prodFiltardos = []
    const ref = useRef(null);

    useScrollToTop(ref);


    const strogeNames = []
    let resultsCopy = []

    const getProdutos = async () => {
        try {
            const response = await AsyncStorage.getAllKeys()
            response.map((name) => {
                if (name.includes('@br-app:produto-all')) {
                    strogeNames.push(name)
                }

            })
        } catch (error) {
            console.log(error)
        }
        strogeNames.map(async (name, id) => {
            try {
                const response = JSON.parse(await AsyncStorage.getItem(name))
                const results = response.results
                resultsCopy = [...resultsCopy, ...results]
                if (strogeNames.length === id + 1) {
                    setProdutos(resultsCopy)
                }
            } catch (error) {
                console.log(error)
            }
        })
    }

    useEffect(() => {
        getProdutos()
    }, [])

    useEffect(() => {
        setNum([0, 21])
    }, [search])

    const first = () => {
        setNum([0, 21])
        if (ref.current) {
            ref.current.scrollTo({ y: 0, animated: true })
        }
    }
    const prev = () => {
        num[0] > 0 ? setNum([num[0] - 21, num[0]]) : setNum([0, 21])
        if (ref.current) {
            ref.current.scrollTo({ y: 0, animated: true })
        }
    }
    const next = () => {
        num[1] < produtos.length ? num[1] + 21 < produtos.length ? setNum([num[0] + 21, num[1] + 21]) : setNum([num[0] + 21, produtos.length]) : null
        if (ref.current) {
            ref.current.scrollTo({ y: 0, animated: true })
        }
    }
    const last = () => {
        setNum([produtos.length - (produtos.length - (Math.trunc(produtos.length / 21) * 21)), produtos.length])
        if (ref.current) {
            ref.current.scrollTo({ y: 0, animated: true })
        }
    }

    produtos.slice(num[0], num[1]).map((item) => {
        if (item.descricao.toUpperCase().includes(search.toUpperCase()) || item.codigo.includes(search)) {
            return (
                prodFiltardos.push(item)
            )
        }
    })

    return (
        <Page navigation={navigation}>
            <ScrollView ref={ref}>
                <View style={styles.Loja}>
                    <View style={styles.search}>
                        <Text style={styles.searchText}>Busca: </Text>
                        <TextInput onChangeText={setSearch} style={styles.searchInput}></TextInput>
                    </View>
                    <View style={styles.produtos}>
                        {search.length > 0 ?
                            prodFiltardos.map((produto, id) => {
                                return (
                                    <MiniCard key={id} produto={produto} navigation={navigation} />
                                )
                            }) :
                            produtos.slice(num[0], num[1]).map((produto, id) => {
                                return (
                                    <MiniCard key={id} produto={produto} navigation={navigation} />
                                )
                            })
                        }
                        {search.length === 0 &&
                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.btnLeft} onPress={() => first()}>
                                    <Icon name='angle-double-left' color='#fff' size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btn} onPress={() => prev()}>
                                    <Icon name='angle-left' color='#fff' size={20} />
                                </TouchableOpacity>
                                <Text style={styles.textBtn}>Página {Math.ceil(num[1] / 21)} de {Math.ceil(produtos.length / 21)}</Text>
                                <TouchableOpacity style={styles.btn} onPress={() => next()}>
                                    <Icon name='angle-right' color='#fff' size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btnRight} onPress={() => last()}>
                                    <Icon name='angle-double-right' color='#fff' size={20} />
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
            </ScrollView>
        </Page >
    );
}

