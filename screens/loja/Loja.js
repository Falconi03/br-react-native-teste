
import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MiniCard from '../../components/mini-card/MiniCard';
import Page from '../../page/Page';
import styles from './lojaStyle'

export default function Loja({ navigation }) {

    const [produtos, setProdutos] = useState([])
    const [num, setNum] = useState([0, 21])

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

    const first = () => {
        setNum([0, 21])
    }
    const prev = () => {
        num[0] > 0 ? setNum([num[0] - 21, num[0]]) : setNum([0, 21])
    }
    const next = () => {
        num[1] < produtos.length ? num[1] + 21 < produtos.length ? setNum([num[0] + 21, num[1] + 21]) : setNum([num[0] + 21, produtos.length]) : null
    }
    const last = () => {
        setNum([produtos.length - (produtos.length - (Math.trunc(produtos.length / 21) * 21)), produtos.length])
    }

    return (
        <View style={styles.Loja}>
            <Page navigation={navigation}>
                <ScrollView>
                    <Text style={styles.title}>LOJA</Text>
                    <View style={styles.produtos}>
                        {produtos.slice(num[0], num[1]).map((produto, id) => {
                            return (
                                <MiniCard produto={produto} navigation={navigation}/>
                            )
                        })}
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.btn} onPress={() => first()}>
                            <Icon name='angle-double-left' color='#fff' size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => prev()}>
                            <Icon name='angle-left' color='#fff' size={20} />
                        </TouchableOpacity>
                        <Text style={styles.textBtn}>Página {Math.ceil(num[1] / 21)} de {Math.ceil(produtos.length / 21)}</Text>
                        <TouchableOpacity style={styles.btn} onPress={() => next()}>
                            <Icon name='angle-right' color='#fff' size={20} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={() => last()}>
                            <Icon name='angle-double-right' color='#fff' size={20} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Page>
        </View>
    );
}

