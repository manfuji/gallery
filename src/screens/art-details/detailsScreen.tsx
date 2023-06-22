/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import React, {useEffect, useLayoutEffect} from 'react';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {Block} from '../../components';
import UserAvatar from '../../hooks/avatar';
// import {useTheme} from '../../hooks';

type DetailsScreenProps = {
  route: RouteProp<RootStackParamList, 'Detail'>;
};

const DetailsScreen = ({route}: DetailsScreenProps) => {
  const data = route.params.data;
  console.log(route);
  const navigation = useNavigation();

  const openWhatsApp = () => {
    const phoneNumber = '+233204538285';
    const url =
      Platform.OS === 'ios'
        ? `whatsapp://wa.me/${phoneNumber}`
        : `whatsapp://send?phone=${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          throw new Error('WhatsApp is not installed.');
        }
      })
      .catch((error) => {
        console.log('Error opening WhatsApp:', error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        title: data.name,
        header: () => (
          <TouchableOpacity
            style={{
              height: 40,
              backgroundColor: 'gray',
              marginTop: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'white'}}>Back</Text>
          </TouchableOpacity>
        ),
      });
    }, [navigation, data]),
  );

  console.log(data);
  return (
    <Block safe>
      <ScrollView className="">
        <Image
          source={{uri: data.image}}
          className="h-96 w-full relative rounded-b-2xl"
        />
        <View className="abolute">
          {/* <TouchableOpacity
            style={{
              height: 40,
              backgroundColor: 'gray',
              marginTop: 24,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Text style={{color: 'white'}}>Back</Text>
          </TouchableOpacity> */}
        </View>
        <Text className="mt-4" />
        <View className="mx-5 bg-white p-3 rounded-lg shadow-2xl">
          <View className=" flex flex-row justify-between">
            <Text className="text-2xl">{data.productName}</Text>
            <Text className="text-2xl">Ghc {data.productPrice}</Text>
          </View>
          <View>
            <Text className="mt-3 text-base text-gray-800 text-center">
              {data.description}
            </Text>
          </View>
          <View className="flex flex-row items-center space-x-3 mt-4 ">
            <UserAvatar username={data.owner?.username!} />
            <Text className="text-2xl capitalize">{data.owner?.username!}</Text>
          </View>
          <View className="w-[90%] mx-[5%] mb-5 flex items-center mt-3">
            <TouchableOpacity
              onPress={() => openWhatsApp()}
              className="bg-[#25D366] w-full flex items-center justify-center px-3 py-2 rounded-2xl">
              <Text className=" text-lg text-gray-100"> Bid for Artefact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Block>
  );
};

export default DetailsScreen;
