import React from 'react'
import { Alert, Button, View } from 'react-native'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'

import { userService } from '../../services/user.service'
import { User } from '../../models/user.model'
import MyInput from '../../components/MyInput'

import styles from './styles'

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const user = route.params as User

    const [name, setName] = React.useState(user.name)
    const [username, setUsername] = React.useState(user.username)

    React.useEffect(() => {
        navigation.setOptions({ title: `Usuário: Id ${user.id}` })
    }, [])

    function save() {
        if (name.trim() === '') {
            Alert.alert('O Nome é obrigatório')
            return
        }

        userService.update({ id: user.id, name, username }).then(saved => {
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
            <MyInput label='Login' initialValue={username} />

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} />
            </View>

        </View>
    )
}