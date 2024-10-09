import React from 'react'
import { Alert, Button, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Roles } from "../../models/roles.model";
import { rolesService } from '../../services/roles.service'
import styles from './styles'
import MyInput from '../../components/MyInput'

export default function NewRolesPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const [name, setName] = React.useState('')

    let description = ''

    React.useEffect(() => {
        navigation.setOptions({ title: 'Nova Role' })
    }, [])

    function save() {
        if (name.trim() === '') {
            Alert.alert('O Nome é obrigatório')
            return
        }
        if (description.trim() === '') {
            Alert.alert('O Login é obrigatório')
            return
        }
        

        rolesService.create({ name, description }).then(saved => {
            navigation.goBack()
        }).catch((error: Error) => {
            if (error.cause === 400) {
                Alert.alert('Role já existe!')
            } else {
                navigation.navigate('Login')
            }
        })
    }

    return (
        <View style={styles.page}>

            <MyInput label='Nome da Role' initialValue={name} change={setName} />
            <MyInput label='Descrição' change={value => description = value} />

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} color="#6200EE" />
            </View>

        </View>
    )


}