import React, { useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Alert,
  TouchableOpacity,
  View,
  Text,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import { Roles } from "../../models/roles.model";
import CustomCheckBox from "../../components/CustomCheckBox/CustomCheckBox";

import { userService } from "../../services/user.service";
import { rolesService } from "../../services/roles.service";
import MyInput from "../../components/MyInput";

import styles from "./styles";

export default function UserPage() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [name, setName] = React.useState("");
  const [rolesNames, setRolesNames] = useState<Roles[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  let username = "";
  let password = "";
  let confirmPass = "";

  React.useEffect(() => {
    navigation.setOptions({ title: "Novo Usuário" });

    rolesService
      .getList()
      .then((data: Roles[]) => {
        setRolesNames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching roles data:", error);
        Alert.alert("Error", "Failed to load roles");
        setLoading(false);
      });
  }, []);

  function save() {
    const roles = rolesNames
      .filter((role) => selectedRoles.includes(role.id!))
      .map((role) => role.name);

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
      .create({ name, username, password, roles })
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

  const toggleRoleSelection = (id: number) => {
    setSelectedRoles((prevSelectedRoles) =>
      prevSelectedRoles.includes(id)
        ? prevSelectedRoles.filter((roleId) => roleId !== id)
        : [...prevSelectedRoles, id]
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6200EE" />;
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

      <View style={styles.rolesContainer}>
        <Text />
        {rolesNames.map((role) => (
          <CustomCheckBox
            key={role.id}
            isChecked={selectedRoles.includes(role.id!)}
            onPress={() => toggleRoleSelection(role.id!)}
            label={role.name}
          />
        ))}
      </View>

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
