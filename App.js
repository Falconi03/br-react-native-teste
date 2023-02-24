import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native'

import Home from "./screens/home/Home";
import Estoque from "./screens/estoque/Estoque";
import BancoImagem from "./screens/banco-imagem/BancoImagem";
import Financeiro from "./screens/financeiro/Financeiro";
import Loja from "./screens/loja/Loja";
import User from "./screens/user/User";
import Plus from "./screens/plus/Plus";
import Login from "./screens/login/Login";
import Load from "./screens/load/Load";
import Produto from "./screens/produto/Produto";
import Carrinho from "./screens/carrinho/Carrinho";
import { ContextProvider } from "./context/Context";

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar /> */}
      <ContextProvider>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Banco de Imagem" component={BancoImagem} options={{ headerShown: false }} />
          <Stack.Screen name="Carrinho" component={Carrinho} options={{ headerShown: false }} />
          <Stack.Screen name="Estoque" component={Estoque} options={{ headerShown: false }} />
          <Stack.Screen name="Financeiro" component={Financeiro} options={{ headerShown: false }} />
          <Stack.Screen name="Loja" component={Loja} options={{ headerShown: false }} />
          <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
          <Stack.Screen name="Plus" component={Plus} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Load" component={Load} options={{ headerShown: false }} />
          <Stack.Screen name="Produto" component={Produto} options={{ headerShown: false }} />
        </Stack.Navigator>
      </ContextProvider>
    </NavigationContainer>
  )
}
