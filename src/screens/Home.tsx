/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';

import {useData, useTheme, useTranslation} from '../hooks/';
import {IArticle, ICategory} from '../constants/types';
import {Block, Button, Article, Text, Input} from '../components/';
import {category as CategoryData} from '../services/api/category/base';
import {fetchProducts} from '../services/api/products/base';

const Home = () => {
  const [selected, setSelected] = useState<ICategory>();
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const {colors, gradients, sizes} = useTheme();
  const {t} = useTranslation();

  const loadCategories = async () => {
    const res = await CategoryData();
    setCategories(res);
    console.log(res);
  };

  const loadProducts = async () => {
    const res = await fetchProducts();
    setArticles(res);
    console.log(res);
  };

  // init articles
  useEffect(() => {
    loadCategories();
    // const categories = CategoryData();
    // setArticles(data?.articles);
    loadProducts();
    // setCategories(data?.categories
    setSelected(categories[0]);
  }, []);

  // update articles on category change
  useEffect(() => {
    const category = categories?.find((cat) => cat?.id === selected?.id);

    const newArticles = articles?.filter(
      (article) => article?.category === category?.catName,
    );

    setArticles(newArticles);
  }, [categories, selected, articles]);

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
      <FlatList
        data={articles}
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
