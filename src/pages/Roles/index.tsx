import React from 'react'
import { Alert, FlatList, View } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { Roles } from "../../models/roles.model";
import ListItem from '../../components/ListItem';
import CustomButton from '../../components/CustomButton/CustomButton';
import { rolesService } from '../../services/roles.service'
import styles from './styles'

export default function RolesPage() {

    const navigation = useNavigation<NavigationProp<any>>()
    const [roles, setRoles] = React.useState<Roles[]>([]);
    const [refreshing, setRefreshing] = React.useState(false);

    function fetchRoles() {
        setRefreshing(true);
        rolesService.getList()
            .then(list => {
                setRoles(list);
                setRefreshing(false);
            })
            .catch(error => {
                navigation.navigate('Login');
            });
    }

    function update(role: Roles) {
        navigation.navigate('EditRole', role);
    }

    function remover(id: number) {
        rolesService.delete(id).then(isDelete => {
            if (isDelete) fetchRoles();
            else Alert.alert('Role não existe');
        });
    }

    React.useEffect(() => {
        navigation.setOptions({ title: 'Roles' }),
            fetchRoles();
    }, [])

    function goToNewRole() {
        navigation.navigate('NewRole');
      }

    return (
        <View style={styles.container}>
            <FlatList
                onRefresh={fetchRoles}
                refreshing={refreshing}
                data={roles}
                keyExtractor={role => role.name}
                renderItem={({ item }) => (
                    <ListItem
                        title={item.name}
                        subTitle={item.description}
                        onEdit={() => update(item)}
                        onRemove={() => remover(item.id!)}
                    />
                )}
            />

            <View style={styles.bottomButtons}>
                <CustomButton title="Adicionar role" onPress={goToNewRole} color="#6200EE" />
            </View>

        </View>

    )
}