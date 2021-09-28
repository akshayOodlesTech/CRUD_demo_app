import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AddUserScreen from './screens/AddUserScreen';
import UserScreen from './screens/UserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import SplashScreen from './screens/SplashScreen';
import CustomDrawerContentComponent from './Components/customDrawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// ,{
//   initialRouteName: 'Menu',
//   contentComponent: CustomDrawerContentComponent,
//   contentOptions: {
//     activeTintColor: '#000000',
//     activeBackgroundColor: '#e6e6e6',
//   }
function DrawerStack() {
  return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContentComponent {...props} />}>
      <Drawer.Screen name="Home" 
      component={UserScreen} 
      options={{ title: 'Users List' }}
      />
      <Drawer.Screen name="AddUserScreen" 
      component={AddUserScreen} 
      options={{ title: 'Add User' }}
      />
      <Drawer.Screen 
       name="UserDetailScreen" 
       component={UserDetailScreen} 
       options={{ title: 'User Detail' }}
      />
      </Drawer.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
          headerShown:false
        }}>
      <Stack.Screen 
        name="SplashScreen" 
        component={SplashScreen} 
        options={{ title: 'Users List' }}
      />
      <Stack.Screen 
        name="Dashboard" 
        component={DrawerStack} 
      />
      {/* <Stack.Screen 
        name="AddUserScreen" 
        component={AddUserScreen} 
        options={{ title: 'Add User' }}
      /> */}

      {/* <Stack.Screen 
       name="UserDetailScreen" 
       component={UserDetailScreen} 
       options={{ title: 'User Detail' }}
      /> */}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}