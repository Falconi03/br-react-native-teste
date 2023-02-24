import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './homeStyle';
import Page from '../../page/Page';

export default function Home({ navigation }) {


  return (
    <Page navigation={navigation}>
      <View style={styles.Home}>
        <Image source={require('../../assets/banner-b2b.jpg')} style={styles.homeImg} resizeMode='contain' />
        <View style={styles.homeContainerText}>
          <Text style={styles.homeText}>O B2B é um portal onde você cliente BR Motorsport consegue efetuar seus pedidos de forma rápida e fácil.</Text>
          <Text style={styles.homeText}>Em caso de dúvidas entre em contato através do email: <Text style={{ fontWeight: 'bold' }}>e.souza@brms.com.br</Text></Text>
          <Text style={styles.homeText}>Para melhor aterdermos, a <Text style={{ fontWeight: 'bold' }}>BR Motorsport </Text>seguirá um novo procedimento para solicitação de garantia.</Text>
          <Text style={styles.homeText}>Informamos que a patir de agora, todas as solicitações para o <Text style={{ fontWeight: 'bold' }}>SAL</Text>, deverão ser enviadas mediante o preenchimento do furmulário no link abaixo:</Text>
          <TouchableOpacity style={styles.homeLink}><Text>'https://atendimento.brms.com.br/form/5827/'</Text></TouchableOpacity>
          <Text style={styles.homeText}>Após o envio do formulário, será gerado um número de ticket para acompanhar os detalhes da sua solicitação.</Text>
          <Text style={styles.homeText}><Text style={{ fontWeight: 'bold', color: '#ff0000' }}>ATENÇÃO:</Text> Não serão atendidos os pedidos enviados para o e-mail: <Text style={{ fontWeight: 'bold' }}>sal@brms.com.br</Text></Text>
        </View>
      </View>
    </Page>
  );
}

