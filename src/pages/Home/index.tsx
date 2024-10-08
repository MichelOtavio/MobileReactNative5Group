import React from 'react';
import { Alert, FlatList, View } from "react-native";
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { authService } from '../../services/auth.service';
import { userService } from '../../services/user.service';
import { User } from "../../models/user.model";
import ListItem from '../../components/ListItem';
import CustomButton from '../../components/CustomButton/CustomButton';

export default function HomePage() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [users, setUsers] = React.useState<User[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  function fetchUsers() {
    setRefreshing(true);
    userService.getList()
      .then(list => {
        setUsers(list);
        setRefreshing(false);
      })
      .catch(error => {
        navigation.navigate('Login');
      });
  }

  function logOut() {
    authService.logOut();
    navigation.navigate('Login');
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <CustomButton title="Sair" onPress={logOut} color="#FF3D00" />, // Red color for log out
      headerRight: () => <CustomButton title="Add" onPress={goToNewUser} color="#6200EE" /> // Purple color for add
    });
    fetchUsers();
  }, []);

  function goToNewUser() {
    navigation.navigate('User');
  }

  function update(user: User) {
    navigation.navigate('EditUser', user);
  }

  function remover(id: number) {
    userService.delete(id).then(isDelete => {
      if (isDelete) fetchUsers();
      else Alert.alert('Usuário não existe');
    });
  }

  return (
    <View>
      <FlatList
        onRefresh={fetchUsers}
        refreshing={refreshing}
        data={users}
        keyExtractor={user => user.username}
        renderItem={({ item }) => (
          <ListItem
            title={item.name}
            subTitle={item.username}
            onEdit={() => update(item)}
            onRemove={() => remover(item.id!)}
          />
        )}
      />
    </View>
  );
}
