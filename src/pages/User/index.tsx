import React from 'react'
import { Alert, Button, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'

import { userService } from '../../services/user.service'
import MyInput from '../../components/MyInput'

import styles from './styles'

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const [name, setName] = React.useState('')

    let username = ''
    let password = ''
    let confirmPass = ''

    React.useEffect(() => {
        navigation.setOptions({ title: 'Novo Usuário' })
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

    return (
        <View style={styles.page}>

            <MyInput label='Name' initialValue={name} change={setName} />
            <MyInput label='Login' change={value => username = value} />
            <MyInput label='Senha' change={value => password = value} secureTextEntry />
            <MyInput label='Confirmar Senha' change={value => confirmPass = value} secureTextEntry />

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save}  color="#6200EE"/>
            </View>

        </View>
    )
}