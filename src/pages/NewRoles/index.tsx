import React from "react";
import { Alert, Button, View, TouchableOpacity, Text, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Roles } from "../../models/roles.model";
import { rolesService } from "../../services/roles.service";
import styles from "./styles";
import MyInput from "../../components/MyInput";

export default function NewRolesPage() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [name, setName] = React.useState("");

  let description = "";

  React.useEffect(() => {
    navigation.setOptions({ title: "Nova Role" });
  }, []);

  function save() {
    if (name.trim() === "") {
      Alert.alert("O Nome é obrigatório");
      return;
    }
    if (description.trim() === "") {
      Alert.alert("O Login é obrigatório");
      return;
    }

    rolesService
      .create({ name, description })
      .then((saved) => {
        navigation.goBack();
      })
      .catch((error: Error) => {
        if (error.cause === 400) {
          Alert.alert("Role já existe!");
        } else {
          navigation.navigate("Login");
        }
      });
  }

  return ( 
    <View style={styles.page}>
         <Image
        source={require("./../../../assets/role.png")} // Caminho para a imagem local
        style={styles.logoImage} // Estilo da imagem
      />

      <MyInput
        label="Nome da Role"
        initialValue={name}
        change={setName}
        placeholder="Nome da Role" // Adicionando o placeholder
        placeholderTextColor="#999" // Opcional, cor do placeholder
      />

      <MyInput
        label="Descrição"
        change={(value) => (description = value)}
        placeholder="Descrição" // Adicionando o placeholder
        placeholderTextColor="#999" // Opcional, cor do placeholder
      />

      <TouchableOpacity style={styles.button} onPress={save}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
