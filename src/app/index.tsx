import { CategoryButton } from "@/components/category-button";
import Header from "@/components/header";
import { View, Text, FlatList, SectionList } from "react-native";

import { CATEGORIES, MENU } from "@/utils/data/products";
import { useState, useRef } from "react";
import { Product } from "@/components/product";
import { Link } from "expo-router";

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const sectionListref = useRef<SectionList>(null);

  function handleCategorySelected(selectedCategory: string) {
    setCategory(selectedCategory);

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListref.current) {
      sectionListref.current.scrollToLocation({
        itemIndex: 0,
        animated: true,
        sectionIndex,
      });
    }
  }

  return (
    <View className="bg-slate-900 flex-1 pt-8">
      <Header title="Faça seu pedido" cartQuantityItems={1} />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelected(item)}
          />
        )}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
      />

      <SectionList
        ref={sectionListref}
        className="flex-1 p-5"
        sections={MENU}
        keyExtractor={({ id }) => id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-xl text-white font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
      />
    </View>
  );
}
