import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginPage from './src/pages/Login'
import HomePage from './src/pages/Home'
import UserPage from './src/pages/User'
import RolesPage from './src/pages/Roles'
import NewRolesPage from './src/pages/NewRoles'
import EditUserPage from './src/pages/User/Edit'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" options={{ title: 'Página de Acesso' }} component={LoginPage} />
        <Stack.Screen name="User" component={UserPage} />
        <Stack.Screen name="EditUser" component={EditUserPage} />
        <Stack.Screen name="Roles" component={RolesPage} />
        <Stack.Screen name="NewRole" component={NewRolesPage} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

