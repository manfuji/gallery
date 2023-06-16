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

const Article = ({
  productName,
  description,
  image,
  category,
  rating,
  location,
  createdAt,
  owner,
  onPress,
}: IArticle) => {
  const {t} = useTranslation();
  const {colors, gradients, icons, sizes} = useTheme();

  // render card for Newest & Fashion
  if (category?.id !== 1) {
    return (
      // <>

      // </>
      // <TouchableWithoutFeedback onPress={onPress}>
      //   <Block card padding={sizes.sm} marginTop={sizes.sm}>
      //     <Image height={170} resizeMode="cover" source={{uri: image}} />
      //     {/* article category */}
      //     {category?.catName && (
      //       <Text
      //         h5
      //         bold
      //         size={13}
      //         marginTop={sizes.s}
      //         transform="uppercase"
      //         marginLeft={sizes.xs}
      //         gradient={gradients.primary}>
      //         {category?.catName}
      //       </Text>
      //     )}

      //     {/* article description */}
      //     {description && (
      //       <Text
      //         p
      //         marginTop={sizes.s}
      //         marginLeft={sizes.xs}
      //         marginBottom={sizes.sm}>
      //         {description.substring(0, 100)}...
      //       </Text>
      //     )}

      //     {/* user details */}
      //     {owner?.username && (
      //       <Block row marginLeft={sizes.xs} marginBottom={sizes.xs}>
      //         <UserAvatar username={owner.username} />
      //         <Block justify="center" marginLeft={sizes.s}>
      //           <Text p semibold>
      //             {owner?.username}
      //           </Text>
      //           <Text p gray>
      //             {t('common.posted', {
      //               date: dayjs(createdAt).format('DD MMMM') || '-',
      //             })}
      //           </Text>
      //         </Block>
      //       </Block>
      //     )}

      //     {/* location & rating */}
      //     {(Boolean(location) || Boolean(rating)) && (
      //       <Block row align="center">
      //         <Image source={icons.location} marginRight={sizes.s} />
      //         <Text p size={12} semibold>
      //           {location?.city}, {location?.country}
      //         </Text>
      //         <Text p bold marginHorizontal={sizes.s}>
      //           •
      //         </Text>
      //         <Image source={icons.star} marginRight={sizes.s} />
      //         <Text p size={12} semibold>
      //           {rating}/5
      //         </Text>
      //       </Block>
      //     )}
      //   </Block>
      // </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onPress}>
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
              {/* <Block color={colors.overlay} radius={5} padding={8} height={12}>             
              </Block> */}
              <Block
                row
                flex={1}
                justify="flex-end"
                className="flex flex-row w-full pl-5 justify-center items-center"
                marginTop={320}
                color={colors.overlay}>
                <UserAvatar username={owner?.username!} />
                <Block
                  justify="center"
                  marginLeft={sizes.s}
                  className="text-center">
                  <Text p white semibold className="w-full text-center">
                    <Txt className="capitalize text-xl ">{productName}</Txt>
                  </Text>
                  <Text p white className="text-center pb-2">
                    {description?.substring(0, 50)}...
                  </Text>
                </Block>
              </Block>
            </Block>
          </Image>
        </Block>
      </TouchableWithoutFeedback>
    );
  }

  // render card for Popular
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Block card white padding={0} marginTop={sizes.sm}>
        <Image
          background
          resizeMode="cover"
          radius={sizes.cardRadius}
          source={{uri: image}}>
          <Block color={colors.overlay} padding={sizes.padding}>
            <Text h4 white marginBottom={sizes.sm}>
              {productName}
            </Text>
            <Text p white>
              {description?.substring(0, 100)}...
            </Text>
            {/* user details */}
            <Block row marginTop={sizes.xxl}>
              <UserAvatar username={owner?.username!} />
              <Block justify="center" marginLeft={sizes.s}>
                <Text p white semibold>
                  {owner?.username}
                </Text>
                <Text p white>
                  {owner?.email}
                </Text>
              </Block>
            </Block>
          </Block>
        </Image>
      </Block>
    </TouchableWithoutFeedback>
  );
};

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
