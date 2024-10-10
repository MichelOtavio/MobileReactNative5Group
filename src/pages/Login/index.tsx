import React, { useState } from "react";
import { Alert, View, TouchableOpacity, Image, Text } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { authService } from "../../services/auth.service";
import MyInput from "../../components/MyInput";
import styles from "./styles";
export default function LoginPage() {

  const navigation = useNavigation<NavigationProp<any>>();

  let username = "";
  let password = "";

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <></>,
    });
  }, []);

  function signIn() {
    authService.login(username, password).then((isLogged) => {
      if (isLogged) {
        navigation.navigate("Home");
      } else {
        Alert.alert("Login/senha inválido(a)!");
      }
    });
  }

  return (
    <View style={styles.page}>
      <Image
        source={require('./../../../assets/login.png')}  // Caminho para a imagem local
        style={styles.logoImage}  // Estilo da imagem
      />
      <MyInput
        label="Login"
        change={(value) => (username = value)}
        placeholder="Digite seu login" 
        placeholderTextColor="#999" 
      /> 
      <MyInput
        label="Senha"
        change={(value) => (password = value)}
        secureTextEntry
        placeholder="Digite sua senha" 
        placeholderTextColor="#999" 
      />

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
}
