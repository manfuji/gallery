/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import {ICategory} from '../constants/types';
import {category as CategoryData} from '../services/api/category/base';
interface ISelected {
  setSelected: Function;
}
const CategoryDropdown = ({setSelected}: ISelected) => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const handleCategoryChange = (category: ICategory) => {
    setSelectedCategory(category);
    setSelected(category);
    setDropdownVisible(false);
  };

  const loadCategories = async () => {
    const res = await CategoryData();
    setCategories(res);
    console.log(res);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setDropdownVisible(true)}
        className="py-1 mb-2 mx-4 bg-gray-200 ">
        <Text className="text-lg px-5 text-center">Select a category</Text>
        <Text className="text-center py-2 text-blue-600 text-xl">
          {selectedCategory?.catName || ''}
        </Text>
      </TouchableOpacity>
      <Modal visible={dropdownVisible} transparent>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={() => setDropdownVisible(false)}>
          <View
            style={{backgroundColor: 'white', padding: 20}}
            className="w-[80%]  items-center ">
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => handleCategoryChange(category)}
                style={{paddingVertical: 10}}>
                <Text>{category.catName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CategoryDropdown;
