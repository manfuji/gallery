import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Login} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import CreatePost from '../screens/post/createPost';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigation();

  const getUser = async () => {
    const user = await AsyncStorage.getItem('user');
    const userData = JSON.parse(user ?? '');

    console.log('===============|||||||||||', userData);

    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    getUser();

    if (isLogin) {
      navigation.navigate('Home');
    }

    console.log('=======', isLogin);
  }, [isLogin, navigation]);
  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />

      {isLogin ? (
        <>
          <Stack.Screen
            name="Components"
            component={Components}
            options={screenOptions.components}
          />

          <Stack.Screen
            name="Articles"
            component={Articles}
            options={{title: t('navigation.articles')}}
          />

          {/* <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} /> */}

          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Artifact"
            component={CreatePost}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
