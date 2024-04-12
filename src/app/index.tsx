import { View, Text, FlatList, SectionList } from "react-native";
import { useState, useRef } from "react";
import { Link } from "expo-router";

import { useCartStore } from "@/stores/cart-store";

import { CategoryButton } from "@/components/category-button";
import Header from "@/components/header";

import { CATEGORIES, MENU } from "@/utils/data/products";
import { Product } from "@/components/product";

export default function Home() {
  const cartStore = useCartStore();

  const [category, setCategory] = useState(CATEGORIES[0]);
  const sectionListref = useRef<SectionList>(null);

  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

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
      <Header title="Faça seu pedido" cartQuantityItems={cartQuantityItems} />

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
