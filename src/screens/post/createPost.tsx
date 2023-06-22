/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Linking,
  Platform,
  Button as Btn,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useData, useTheme, useTranslation} from '../../hooks/';
import * as regex from '../../constants/regex';
import * as ImagePicker from 'expo-image-picker';
import {Block, Button, Input, Image, Text, Checkbox} from '../../components/';
import {showAlert} from '../../hooks/toastMesasage';
import {View} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryDropdown from '../../components/categoryDropdown';
import {TouchableOpacity} from 'react-native';
import {createProducts} from '../../services/api/products/create';

import {Camera} from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const isAndroid = Platform.OS === 'android';

interface IProduct {
  productName: string;
  productPrice: string;
  description: string;
  status: string;
  category: any;
  image?: any;

  // confirmPassword: string;
}
interface IProductValidation {
  productName: boolean;
  productPrice: boolean;
  description: boolean;

  // confirmPassword: boolean;
}

const CreatePost = () => {
  //   const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [selected, setSelected] = useState<any>();
  const [isLogin, setIsLogin] = useState(false);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
  }, [isLogin, navigation]);

  const [isValid, setIsValid] = useState<IProductValidation>({
    productName: false,
    productPrice: false,
    description: false,
    // confirmPassword: false,
  });
  const [registration, setRegistration] = useState<IProduct>({
    productName: '',
    productPrice: '',
    description: '',
    status: '',
    category: selected?.id,
  });

  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value: any) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignUp = useCallback(async () => {
    setIsLoading(true);
    if (!Object.values(isValid).includes(false)) {
      /** send/save registration data */
      console.log('handleSignUp', registration);

      const formData = new FormData();
      if (!image) {
        showAlert({title: 'Error', message: 'Please select image'});
        return;
      }

      //   try {
      //     const response = await fetch(image);
      //     const blob = await response.blob();
      //     formData.append('image', blob, 'image.jpg');
      //     console.log(blob.type);
      //   } catch (error) {
      //     console.log('Error fetching image:', JSON.stringify(error));
      //     showAlert({title: 'Error', message: 'Failed to fetch image'});
      //     return;
      //   }

      //   const formData = new FormData();
      if (!image) {
        showAlert({title: 'Error', message: 'Please select image'});
        return;
      }

      const fileInfo = await FileSystem.getInfoAsync(image);
      const imageUriParts = fileInfo.uri.split('.');
      const imageType = imageUriParts[imageUriParts.length - 1];
      // @ts-ignore
      formData.append('image', {
        uri: fileInfo.uri,
        // @ts-ignore

        name: `${fileInfo.modificationTime}image.${imageType}`,
        type: `image/${imageType}`,
      });

      formData.append('productName', registration.productName);
      formData.append('productPrice', registration.productPrice);
      formData.append('description', registration.description);
      formData.append('status', 'AVAILABLE');
      formData.append('category', selected?.catName);

      try {
        const res = await createProducts({body: formData});
        showAlert({title: 'Product', message: 'Product created successfully'});
        // setRegistration({
        //   productName: '',
        //   productPrice: '',
        //   description: '',
        //   status: '',
        //   category: selected?.id,
        // });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsLoading(false);

        showAlert({title: 'Product', message: 'Product creation failed'});
      }
    } else {
      setIsLoading(false);

      showAlert({title: 'Product', message: 'All fields are required'});
    }
  }, [isValid, registration, image, selected]);

  //   image upload
  const pickImage = async () => {
    let {status} = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      console.log('Camera permission not granted');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // @ts-ignore
    if (!result.cancelled) {
      // @ts-ignore
      const fileInfo = await FileSystem.getInfoAsync(result.uri);
      setImage(fileInfo.uri);
    }
  };

  //   const pickImage = async () => {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.All,
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (!result.cancelled) {
  //       if (isAndroid) {
  //         setImage(result.uri);
  //       } else {
  //         setImage(result.uri || result.uri);
  //       }
  //     }
  //   };

  // emd of image upload

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      description: regex.name.test(registration.description),
      productName: regex.name.test(registration.productName),
      productPrice: regex.name.test(registration.description),
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
            // @ts-ignore

            height={sizes.height * 0.3}>
            <Button
              row
              flex={0}
              justify="flex-start"
              onPress={() => navigation.goBack()}>
              <Image
                radius={0}
                // @ts-ignore

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
              {'Create artifact...'}
            </Text>
          </Image>
        </Block>
        {/* register form */}
        <ScrollView
          // keyboard
          // behavior={!isAndroid ? 'padding' : 'height'}
          // @ts-ignore
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
                    label={'Name Of Artifact'}
                    placeholder={'Type the name of the artifact'}
                    success={Boolean(
                      registration.productName && isValid.productName,
                    )}
                    danger={Boolean(
                      registration.productName && !isValid.productName,
                    )}
                    onChangeText={(value) => handleChange({productName: value})}
                  />
                  <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={'Price'}
                    keyboardType="number-pad"
                    placeholder={'Type the Price of the artifact'}
                    success={Boolean(
                      registration.productPrice && isValid.productPrice,
                    )}
                    danger={Boolean(
                      registration.productPrice && !isValid.productPrice,
                    )}
                    onChangeText={(value) =>
                      handleChange({productPrice: value})
                    }
                  />
                  <Input
                    autoCapitalize="none"
                    marginBottom={sizes.m}
                    label={'Description'}
                    // keyboardType='number'
                    placeholder={'Abrief description of the artifact'}
                    success={Boolean(
                      registration.description && isValid.description,
                    )}
                    danger={Boolean(
                      registration.description && !isValid.description,
                    )}
                    onChangeText={(value) => handleChange({description: value})}
                  />
                  <View>
                    <CategoryDropdown setSelected={setSelected} />

                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={pickImage}
                        className="my-2 bg-gray-200 rounded-xl p-4 shadow-lg">
                        <Text className="text-xl text-blue-600 font-semibold">
                          Select image of the artifact
                        </Text>
                      </TouchableOpacity>
                      {image && (
                        <Image
                          source={{uri: image}}
                          style={{width: 200, height: 200}}
                        />
                      )}
                    </View>
                  </View>
                </Block>
              </View>
              {/* checkbox terms */}
              {isLoading ? (
                <ActivityIndicator color={'green'} size={30} />
              ) : (
                <Button
                  onPress={handleSignUp}
                  marginVertical={sizes.s}
                  marginHorizontal={sizes.sm}
                  gradient={gradients.primary}
                  disabled={Object.values(isValid).includes(false)}>
                  <Text bold white transform="uppercase">
                    {'Create Artefact'}
                  </Text>
                </Button>
              )}
            </Block>
          </Block>
        </ScrollView>
      </Block>
    </Block>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#A8A8A8',
  },
});

export default CreatePost;
