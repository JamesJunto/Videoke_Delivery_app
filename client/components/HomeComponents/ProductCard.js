import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import useProducts from "../../hooks/useProducts";
import { useCart } from "../../context/cartContext";

const HomeCards = () => {
  const products = useProducts();
  const { addToCart } = useCart()

  return (
    <>
      {products.map((item) => (
        <View
          key={item.product_id}
          className="mb-3 w-[100%] overflow-hidden rounded-[10px] bg-white"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 5,
            elevation: 2,
          }}
        >
          <View className="h-32 items-center justify-center bg-gray-100">
            <Ionicons
              name={item.icon}
              size={48}
              color="#C1272D"
            />

            <View className="absolute right-2 top-2 rounded-full bg-green-100 px-2 py-1">
              <Text className="text-[10px] font-semibold text-green-700">
                Available
              </Text>
            </View>
          </View>

          <View className="p-3">
            <Text className="text-[11px] font-medium uppercase text-gray-400">
              Videoke
            </Text>

            <Text
              className="mt-1 text-[16px] font-bold text-gray-900"
              numberOfLines={1}
            >
              {item.title}
            </Text>

            <Text className="mt-1 text-[13px] text-gray-500">
              Davao City
            </Text>

            <Text className="mt-2 text-[17px] font-bold text-[#C1272D]">
              {item.price}
            </Text>

            <Pressable
              className="mt-3 h-10 flex-row items-center justify-center rounded-xl bg-[#C1272D]"
              onPress={() => addToCart(item)}
            >
              <Ionicons
                name="cart-outline"
                size={17}
                color="#FFFFFF"
              />

              <Text className="ml-1.5 text-[13px] font-bold text-white">
                Order Now
              </Text>
            </Pressable>
          </View>
        </View>
      ))}
    </>
  );
};

export default HomeCards;
