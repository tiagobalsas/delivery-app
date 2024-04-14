import { ScrollView, Text, View } from "react-native";

import { useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";

import Header from "@/components/header";
import { Product } from "@/components/product";
import { LinkButton } from "@/components/link-button";

export default function Cart() {
  const cartStore = useCartStore();
  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );
  return (
    <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <ScrollView>
        {cartStore.products.length > 0 ? (
          <View className="flex-1 p-5">
            {cartStore.products.map((product) => (
              <Product key={product.id} data={product} />
            ))}
          </View>
        ) : (
          <Text className="text-slate-400 text-center font-body my-8">
            Seu carrinho está vazio.
          </Text>
        )}

        <View className="flex-row items-center gap-2 mt-5 mb-4 ">
          <Text className="text-white text-xl font-subtitle">Total:</Text>
          <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
        </View>
      </ScrollView>
      <LinkButton href="/" title="Voltar"></LinkButton>
    </View>
  );
}
