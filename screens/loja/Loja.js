
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Page from '../../page/Page';

export default function Loja({ navigation }) {
    return (
        <View style={styles.container}>
            <Page navigation={navigation}>
                <Text>Loja</Text>
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