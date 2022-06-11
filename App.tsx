import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useState } from 'react';
import * as React from 'react';

import ProfilePage from './screens/ProfilePage';
import EditProfilePage from './screens/EditProfilePage';


import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileReducers, { nameReducer, usernameReducer, bioReducer} from './ProfileReducer';

const store = configureStore({ reducer: ProfileReducers} );

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export type RootStackParamList = {
  ProfilePage: undefined;
  EditProfilePage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {

  const [page, setPage] = useState('profile');
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProfilePage">
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

type PageProp = {
  page: string,
  setPage: any,
}

// function Page(props: PageProp) {
//   if (props.page == 'profile') {

//     return (
//       <View style={styles.container}>
//         <ProfilePage setPage={props.setPage}/>
//       </View>
//     );
//   }

//   else {
//     return (
//       <View style={styles.container}>
//         <EditProfilePage setPage={props.setPage}/>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;