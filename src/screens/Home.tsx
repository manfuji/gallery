/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';

import {useData, useTheme, useTranslation} from '../hooks/';
import {IArticle, ICategory} from '../constants/types';
import {Block, Button, Article, Text, Input} from '../components/';
import {category as CategoryData} from '../services/api/category/base';
import {fetchProducts} from '../services/api/products/base';
import {useFocusEffect} from '@react-navigation/native';

const Home = () => {
  const [selected, setSelected] = useState<ICategory>();
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [filteredArticles, setFilteredArticles] =
    useState<IArticle[]>(articles);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {colors, gradients, sizes} = useTheme();
  const {t} = useTranslation();

  const loadCategories = async () => {
    const res = await CategoryData();
    setCategories([...[{catName: 'All', id: 123}], ...res]);
    console.log(res);
  };

  const loadProducts = async () => {
    setIsLoading(true);

    const res = await fetchProducts();
    setArticles(res);
    setFilteredArticles(res);
    console.log(res);
    setIsLoading(false);
  };

  // init articles
  // useEffect(() => {
  //   setIsLoading(true);
  //   loadCategories();
  //   // const categories = CategoryData();
  //   // setArticles(data?.articles);
  //   loadProducts();
  //   // setCategories(data?.categories
  //   setSelected({catName: 'All', id: 123});
  //   setIsLoading(false);
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Side effect logic here
      // Runs when the screen comes into focus
      // Clean up logic can be handled here as well
      setIsLoading(true);
      loadCategories();
      // const categories = CategoryData();
      // setArticles(data?.articles);
      loadProducts();
      // setCategories(data?.categories
      setSelected({catName: 'All', id: 123});
      setIsLoading(false);
      console.log('running');
      return () => {
        // Clean up logic here
        // Runs when the screen goes out of focus
      };
    }, []),
  );

  // // update articles on category change
  useEffect(() => {
    setIsLoading(true);
    // setFilteredArticles(articles);

    if (selected?.id === 123) {
      setFilteredArticles(articles);
      console.log('clicked all', articles);
    } else {
      const category = categories?.find((cat) => cat?.id === selected?.id);

      const newArticles = articles?.filter(
        (article) => article?.category === category?.catName,
      );

      setFilteredArticles(newArticles);
      console.log('clicked two', newArticles);
    }
    setIsLoading(false);
  }, [categories, selected]);

  console.log('slected', selected);

  return (
    <Block className="px-10">
      {/* search bar */}
      <View className="mx-10">
        <Block
          color={colors.card}
          flex={0}
          className="px-10"
          // eslint-disable-next-line react-native/no-inline-styles
          style={{marginHorizontal: 8}}>
          <Input search placeholder={t('common.search')} />
        </Block>
      </View>
      {/* categories list */}
      <Block color={colors.card} row flex={0} paddingVertical={sizes.padding}>
        <Block
          scroll
          horizontal
          renderToHardwareTextureAndroid
          showsHorizontalScrollIndicator={false}
          contentOffset={{x: -sizes.padding, y: 0}}>
          {categories?.map((category) => {
            const isSelected = category?.id === selected?.id;
            return (
              <Button
                radius={sizes.m}
                marginHorizontal={sizes.s}
                key={`category-${category?.id}}`}
                onPress={() => setSelected(category)}
                gradient={gradients?.[isSelected ? 'primary' : 'light']}>
                <Text
                  p
                  bold={isSelected}
                  white={isSelected}
                  black={!isSelected}
                  transform="capitalize"
                  marginHorizontal={sizes.m}>
                  {category?.catName}
                </Text>
              </Button>
            );
          })}
        </Block>
      </Block>

      {isLoading && <ActivityIndicator size={30} color={'green'} />}
      {filteredArticles.length < 1 && (
        <View className="flex h-96 text-center w-[90%] items-center justify-center">
          <Text p semibold className="text-3xl font-bold">
            No post for {selected?.catName}
          </Text>
        </View>
      )}
      <FlatList
        data={filteredArticles}
        inverted
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item?.id}`}
        style={{paddingHorizontal: sizes.padding}}
        contentContainerStyle={{paddingBottom: sizes.l}}
        renderItem={({item}) => <Article {...item} />}
      />
    </Block>
  );
};

export default Home;
