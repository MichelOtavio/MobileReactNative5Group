import React, { useState, useEffect } from 'react';
import { Alert, TouchableOpacity, View, Text, Image, ActivityIndicator } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { userService } from '../../services/user.service';
import { rolesService } from '../../services/roles.service';
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';
import MyInput from '../../components/MyInput';

import styles from './styles';

export default function UserPage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [rolesNames, setRolesNames] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        navigation.setOptions({ title: 'Novo Usuário' });

        // Carregar os roles
        rolesService.getList()
            .then((data) => {
                setRolesNames(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching roles data:', error);
                Alert.alert('Error', 'Failed to load roles');
                setLoading(false);
            });
    }, []);

    // Função para salvar o usuário
    function save() {
        const roles = rolesNames
            .filter(role => selectedRoles.includes(role.id))
            .map(role => role.name);

        if (name.trim() === '') {
            Alert.alert('O Nome é obrigatório');
            return;
        }
        if (username.trim() === '') {
            Alert.alert('O Login é obrigatório');
            return;
        }
        if (password.trim() === '') {
            Alert.alert('A Senha é obrigatória');
            return;
        }
        if (password !== confirmPass) {
            Alert.alert('A senha não confere');
            return;
        }

        userService.create({ name, username, password, roles })
            .then(() => {
                navigation.goBack();
            })
            .catch((error: Error) => {
                if (error.cause === 400) {
                    Alert.alert('Usuário já existe!');
                } else {
                    navigation.navigate('Login');
                }
            });
    }

    // Função para alternar a seleção de roles
    const toggleRoleSelection = (id: number) => {
        setSelectedRoles(prevSelectedRoles =>
            prevSelectedRoles.includes(id)
                ? prevSelectedRoles.filter(roleId => roleId !== id)
                : [...prevSelectedRoles, id]
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#6200EE" />;
    }

    return (
        <View style={styles.page}>
            <Image
                source={require('./../../../assets/cadastro.png')} // Caminho para a imagem local
                style={styles.logoImage} // Estilo da imagem
            />

            <MyInput
                label="Name"
                initialValue={name}
                change={setName}
                placeholder="Name"
                placeholderTextColor="#999"
            />
            <MyInput
                label="Login"
                change={setUsername}
                placeholder="Login"
                placeholderTextColor="#999"
            />

            {/* Roles */}
            <View style={styles.rolesContainer}>
                {rolesNames.map(role => (
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
                change={setPassword}
                secureTextEntry
                placeholder="Senha"
                placeholderTextColor="#999"
            />
            <MyInput
                label="Confirmar Senha"
                change={setConfirmPass}
                secureTextEntry
                placeholder="Confirmar Senha"
                placeholderTextColor="#999"
            />

            <TouchableOpacity style={styles.button} onPress={save}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}
