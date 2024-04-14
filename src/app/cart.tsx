import { Text, View } from "react-native";

import { useCartStore } from "@/stores/cart-store";

import Header from "@/components/header";
import { Product } from "@/components/product";
import { LinkButton } from "@/components/link-button";

export default function Cart() {
  const cartStore = useCartStore();
  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />

      <View className="flex-1 p-5">
        {cartStore.products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </View>

      <LinkButton href="/" title="Voltar"></LinkButton>
    </View>
  );
}
