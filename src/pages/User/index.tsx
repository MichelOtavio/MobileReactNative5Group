import React from "react";
import { Alert, TouchableOpacity, View, Text, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { userService } from "../../services/user.service";
import MyInput from "../../components/MyInput";

import styles from "./styles";

export default function UserPage() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [name, setName] = React.useState("");

  let username = "";
  let password = "";
  let confirmPass = "";

  React.useEffect(() => {
    navigation.setOptions({ title: "Novo Usuário" });
  }, []);

  function save() {
    if (name.trim() === "") {
      Alert.alert("O Nome é obrigatório");
      return;
    }
    if (username.trim() === "") {
      Alert.alert("O Login é obrigatório");
      return;
    }
    if (password.trim() === "") {
      Alert.alert("A Senha é obrigatória");
      return;
    }
    if (password !== confirmPass) {
      Alert.alert("A senha não confere");
      return;
    }

    userService
      .create({ name, username, password })
      .then((saved) => {
        navigation.goBack();
      })
      .catch((error: Error) => {
        if (error.cause === 400) {
          Alert.alert("Usuário já existe!");
        } else {
          navigation.navigate("Login");
        }
      }); 
  }

  return (
    <View style={styles.page}>
      <Image
        source={require("./../../../assets/cadastro.png")} // Caminho para a imagem local
        style={styles.logoImage} // Estilo da imagem
      />

      <MyInput
        label="Name"
        initialValue={name}
        change={setName}
        placeholder="Name" // Adicionando o placeholder
        placeholderTextColor="#999" // Opcional, cor do placeholder
      />
      <MyInput
        label="Login"
        change={(value) => (username = value)}
        placeholder="Login" // Adicionando o placeholder
        placeholderTextColor="#999" // Opcional, cor do placeholder
      />
      <MyInput
        label="Senha"
        change={(value) => (password = value)}
        secureTextEntry
        placeholder="Senha" // Adicionando o placeholder
        placeholderTextColor="#999" // Opcional, cor do placeholder
      />
      <MyInput
        label="Confirmar Senha"
        change={(value) => (confirmPass = value)}
        secureTextEntry
        placeholder="Confirmar Senha" // Adicionando o placeholder
        placeholderTextColor="#999" // Opcional, cor do placeholder
      />

      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
