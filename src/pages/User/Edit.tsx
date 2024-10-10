import React from 'react'
import { Alert, Button, View, ActivityIndicator } from 'react-native'
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'

import { userService } from '../../services/user.service'
import { User } from '../../models/user.model'
import MyInput from '../../components/MyInput'


import CustomCheckBox from '../../components/CustomCheckBox/CustomCheckBox';

import { Roles } from '../../models/roles.model';

import styles from './styles'

export default function UserPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const route = useRoute()

    const user = route.params as User

    const [name, setName] = React.useState(user.name)
    const [username, setUsername] = React.useState(user.username)
    const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [roles, setRoles] = React.useState<Roles[]>([]);
    const [selectedRoleNames, setSelectedRoleNames] = React.useState<string[]>([]);

    React.useEffect(() => {
        navigation.setOptions({ title: `Usuário: ${user.name}` })

        userService.getUserById(user.id)
            .then((data: User) => {
                const roles = data.roles;

                setRoles(
                    roles.map((name, index) => ({
                        id: index + 1,
                        name,
                        description: `${name} role`,
                    }))
                );

                setSelectedRoleNames(roles);



                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching roles data:', error);
                Alert.alert('Error', 'Failed to load roles');
                setLoading(false);
            });
    }, [])

    function save() {
        console.log("Roles: " + JSON.stringify(roles));


        const names = roles
            .filter(role => selectedRoleNames.includes(role.name))
            .map(role => role.name);

            console.log("selectedRoleNames: " + selectedRoleNames);
            console.log("names: " + names);

        if (name.trim() === '') {
            Alert.alert('O Nome é obrigatório')
            return
        }

        userService.update({ id: user.id, name, username, roles: names }).then(saved => {
            navigation.goBack()
        }).catch((error: Error) => {
            if (error.cause === 400) {
                Alert.alert('Usuário já existe!')
            } else {
                navigation.navigate('Login')
            }
        })
    }

    const toggleRoleSelection = (roleName: string) => {
        setSelectedRoleNames(prevSelectedRoleNames =>
            prevSelectedRoleNames.includes(roleName)
                ? prevSelectedRoleNames.filter(name => name !== roleName)
                : [...prevSelectedRoleNames, roleName]
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#6200EE" />;
    }

    return (
        <View style={styles.page}>

            <MyInput label='Name' initialValue={name} change={setName} />
            <MyInput label='Login' initialValue={username} />

            <View style={styles.rolesContainer}>
                {roles.map(role => (
                    <CustomCheckBox
                        key={role.id}
                        isChecked={selectedRoleNames.includes(role.name)}
                        onPress={() => toggleRoleSelection(role.name)}
                        label={role.name}
                    />
                ))}
            </View>

            <View style={styles.buttonView}>
                <Button title='Salvar' onPress={save} />
            </View>

        </View>
    )
}