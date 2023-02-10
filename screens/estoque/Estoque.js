import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Page from '../../page/Page';

export default function Estoque({ navigation }) {

  const [estoque, setEstoque] = useState([])

  const strogeNames = []
  let resultsCopy = []

  const getEstoque = async () => {
    try {
      const response = await AsyncStorage.getAllKeys()
      response.map((name) => {
        if (name.includes('@br-app:estoque')) {
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
          setEstoque(resultsCopy)
        }
      } catch (error) {
        console.log(error)
      }
    })
  }

  useEffect(() => {
    getEstoque()
  }, [])

  console.log(2, estoque)

  return (
    <View style={styles.container}>
      <Page navigation={navigation}>
        <Text>Estoque</Text>
        {/* {estoque.map(()=>)} */}
      </Page>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: '#fff',
    flex: 1,
    backgroundColor: '#2d353c',
    alignItems: 'center',
    justifyContent: 'center',
  },
});