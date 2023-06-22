/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import dayjs from 'dayjs';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Text from './Text';
import Block from './Block';
import Image from './Image';
import {useTheme, useTranslation} from '../hooks/';
import {IArticle} from '../constants/types';
import UserAvatar from '../hooks/avatar';
import {Text as Txt} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Article = ({
  productName,
  description,
  image,
  category,
  rating,
  location,
  createdAt,
  owner,
  productPrice,
  onPress,
}: IArticle) => {
  const {t} = useTranslation();
  const {colors, gradients, icons, sizes} = useTheme();

  const navigation = useNavigation();

  const screenData = {
    productName,
    description,
    image,
    category,
    rating,
    location,
    createdAt,
    owner,
    productPrice,
  };

  // render card for Newest & Fashion
  // if (category?.id !== 1) {
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Detail', {data: screenData})}>
      <Block card white padding={0} marginTop={sizes.sm}>
        <Image
          background
          resizeMode="cover"
          radius={sizes.cardRadius}
          source={{uri: image}}>
          <Block
            height={400}
            style={styles.container}
            className="flex justify-between">
            <Block
              row
              flex={1}
              justify="flex-end"
              className="flex flex-row w-full pl-5 justify-center items-center"
              marginTop={320}
              color={colors.overlay}>
              <UserAvatar username={owner?.username!} />
              <Block
                // justify=""
                marginLeft={sizes.s}
                className="ml-5">
                <Text p white semibold className="w-full ml-5">
                  <Text p white className="text-left pb-2">
                    <Txt className="capitalize text-2xl font-bold ">
                      {owner?.username!}
                    </Txt>
                    {/* {description?.substring(0, 50)}... */}
                  </Text>
                </Text>
                <Text p white className="text-left pb-2  ml-5">
                  <Txt className="capitalize text-xl ">{productName}</Txt>
                  {/* {description?.substring(0, 50)}... */}
                </Text>
              </Block>
            </Block>
          </Block>
        </Image>
      </Block>
    </TouchableWithoutFeedback>
  );
};

// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  spaceToTop: {
    marginTop: 100,
  },
});

export default Article;
