// import React, {useCallback, useEffect} from 'react';
// import {Linking, StatusBar} from 'react-native';

// import {useTheme, useTranslation} from '../hooks/';
// import {Block, Button, Image, Text} from '../components/';

// const Pro = () => {
//   const {t} = useTranslation();
//   const {assets, colors, gradients, sizes} = useTheme();

//   useEffect(() => {
//     StatusBar.setBarStyle('light-content');
//     return () => {
//       StatusBar.setBarStyle('dark-content');
//     };
//   }, []);

//   const handleWebLink = useCallback((url) => Linking.openURL(url), []);

//   return (
//     <Image
//       background
//       source={assets.background}
//       padding={sizes.padding}
//       style={{flex: 1}}>
//       <Block safe justify="center">
//         <Block card flex={0} padding={sizes.sm} marginBottom={sizes.sm}>
//           <Text h4 center semibold marginBottom={sizes.sm}>
//             {t('pro.title')}
//           </Text>

//           <Text marginBottom={sizes.padding}>{t('pro.appTemplate')}</Text>

//           <Text semibold>{t('pro.components', {count: 11})}</Text>
//           <Text semibold>{t('pro.screens', {count: 18})}</Text>
//           <Text semibold>{t('pro.support')}</Text>

//           <Text marginVertical={sizes.padding}>{t('pro.saveTime')}</Text>

//           <Text>{t('pro.takeAdvantage')}</Text>

//           <Block
//             row
//             flex={0}
//             justify="space-evenly"
//             marginVertical={sizes.padding}>
//             <Image
//               source={assets.ios}
//               color={colors.icon}
//               style={{height: 38, width: 82}}
//             />
//             <Image
//               source={assets.android}
//               color={colors.icon}
//               style={{height: 38, width: 140}}
//             />
//           </Block>

//           <Button
//             gradient={gradients.primary}
//             onPress={() =>
//               handleWebLink(
//                 'https://www.creative-tim.com/product/soft-ui-pro-react-native',
//               )
//             }>
//             <Text white bold transform="uppercase">
//               {t('pro.buyNow')}
//             </Text>
//           </Button>
//         </Block>
//       </Block>
//     </Image>
//   );
// };

// export default Pro;
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components';
import {showAlert} from '../hooks/toastMesasage';
import {View} from 'native-base';
import {LoginUser} from '../services/api/auth/login/base';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  email: string;
  password: string;

  // confirmPassword: string;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;

  // confirmPassword: boolean;
}

const Login = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,

    // confirmPassword: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
    password: '',
    // confirmPassword: '',
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignUp = useCallback(async () => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      console.log('handleSignUp', registration);

      const userData = await LoginUser({
        username: registration.name,
        password: registration.password,
      });

      console.log('=============>>>>>>>', userData);
    } else {
      // console.log('handleSignUp', );
      showAlert({title: 'Register', message: 'All fields are required'});
    }
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);

  return (
    <Block safe marginTop={sizes.md}>
      <Block paddingHorizontal={sizes.s}>
        <Block flex={0} style={{zIndex: 0}}>
          <Image
            background
            resizeMode="cover"
            padding={sizes.sm}
            radius={sizes.cardRadius}
            source={assets.background}
            height={sizes.height * 0.3}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                width={10}
                height={18}
                color={colors.white}
                source={assets.arrow}
                transform={[{rotate: '180deg'}]}
              />
              <Text p white marginLeft={sizes.s}>
                {t('common.goBack')}
              </Text>
            </Button>

            <Text h4 center white marginBottom={sizes.md}>
              {t('register.title')}
            </Text>
          </Image>
        </Block>
        {/* register form */}
        <ScrollView
          // keyboard
          // behavior={!isAndroid ? 'padding' : 'height'}
          marginTop={-(sizes.height * 0.2 - sizes.l)}>
          <Block
            flex={0}
            radius={sizes.sm}
            marginHorizontal="8%"
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
          >
            <Block
              blur
              flex={0}
              intensity={90}
              radius={sizes.sm}
              overflow="hidden"
              justify="space-evenly"
              tint={colors.blurTint}
              paddingVertical={sizes.sm}>
              <Text p semibold center>
                {t('register.subtitle')}
              </Text>
              {/* social buttons */}
              <Block row center justify="space-evenly" marginVertical={sizes.m}>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.facebook}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.apple}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
                <Button outlined gray shadow={!isAndroid}>
                  <Image
                    source={assets.google}
                    height={sizes.m}
                    width={sizes.m}
                    color={isDark ? colors.icon : undefined}
                  />
                </Button>
              </Block>
              <Block
                row
                flex={0}
                align="center"
                justify="center"
                marginBottom={sizes.sm}
                paddingHorizontal={sizes.xxl}>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[1, 0]}
                  start={[0, 1]}
                  gradient={gradients.divider}
                />
                <Text center marginHorizontal={sizes.s}>
                  {t('common.or')}
                </Text>
                <Block
                  flex={0}
                  height={1}
                  width="50%"
                  end={[0, 1]}
                  start={[1, 0]}
                  gradient={gradients.divider}
                />
              </Block>
              {/* form inputs */}

              <View className=" flex-1 flex">
                <Block paddingHorizontal={sizes.sm}>
                  <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={t('common.name')}
                    placeholder={t('common.namePlaceholder')}
                    success={Boolean(registration.name && isValid.name)}
                    danger={Boolean(registration.name && !isValid.name)}
                    onChangeText={(value) => handleChange({name: value})}
                  />
                  <Input
                    secureTextEntry
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={t('common.password')}
                    placeholder={t('common.passwordPlaceholder')}
                    onChangeText={(value) => handleChange({password: value})}
                    success={Boolean(registration.password && isValid.password)}
                    danger={Boolean(registration.password && !isValid.password)}
                  />
                </Block>
              </View>
              {/* checkbox terms */}
              <Block row flex={0} align="center" paddingHorizontal={sizes.sm}>
                <Text paddingRight={sizes.s}>
                  {t('common.agree')}
                  <Text
                    semibold
                    onPress={() => {
                      Linking.openURL('https://www.creative-tim.com/terms');
                    }}>
                    {t('common.terms')}
                  </Text>
                </Text>
              </Block>

              <Button
                onPress={handleSignUp}
                primary
                outlined
                shadow={!isAndroid}
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                disabled={Object.values(isValid).includes(false)}>
                <Text bold primary transform="uppercase">
                  {t('common.signin')}
                </Text>
              </Button>
              <Button
                marginVertical={sizes.s}
                marginHorizontal={sizes.sm}
                gradient={gradients.primary}
                onPress={() => navigation.navigate('Register')}>
                <Text bold white transform="uppercase">
                  {t('common.signup')}
                </Text>
              </Button>
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};

export default Login;
