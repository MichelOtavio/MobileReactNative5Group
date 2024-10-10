import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { View, Button, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { Roles } from '../../models/roles.model';
import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';

import { userService } from '../../services/user.service'
import { rolesService } from '../../services/roles.service'
import MyInput from '../../components/MyInput'

import styles from './styles'

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const [name, setName] = React.useState('')
    const [roles, setRoles] = useState<Roles[]>([]);
    const [selectedRoles, setSelectedRoles] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    let username = ''
    let password = ''
    let confirmPass = ''

    React.useEffect(() => {
        navigation.setOptions({ title: 'Novo Usuário' })

        rolesService.getList()
            .then((data: Roles[]) => {
                setRoles(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching roles data:', error);
                Alert.alert('Error', 'Failed to load roles');
                setLoading(false);
            });
    }, [])

    function save() {
        if (name.trim() === '') {
            Alert.alert('O Nome é obrigatório')
            return
        }
        if (username.trim() === '') {
            Alert.alert('O Login é obrigatório')
            return
        }
        if (password.trim() === '') {
            Alert.alert('A Senha é obrigatória')
            return
        }
        if (password !== confirmPass) {
            Alert.alert('A senha não confere')
            return
        }

        userService.create({ name, username, password }).then(saved => {
            navigation.goBack()
        }).catch((error: Error) => {
            if (error.cause === 400) {
                Alert.alert('Usuário já existe!')
            } else {
                navigation.navigate('Login')
            }
        })
    }

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

            <MyInput label='Name' initialValue={name} change={setName} />
            <MyInput label='Login' change={value => username = value} />

            <View style={styles.rolesContainer}>
                {roles.map(role => (
                    <CustomCheckBox
                        key={role.id}
                        isChecked={selectedRoles.includes(role.id!)}
                        onPress={() => toggleRoleSelection(role.id!)}
                        label={role.name}
                    />
                ))}
            </View>

            <MyInput label='Senha' change={value => password = value} secureTextEntry />
            <MyInput label='Confirmar Senha' change={value => confirmPass = value} secureTextEntry />

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} color="#6200EE" />
            </View>

        </View>
    )
}