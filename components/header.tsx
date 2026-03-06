import { useAppTheme } from "@/hooks/use-app-theme";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";

const Header = () => {
  const { colors } = useAppTheme();

  return (
    <View className="flex-row justify-between items-center p-2 bg-background">
      <View className="flex-row gap-2 items-center ">
        <MaterialIcons name="ondemand-video" size={24} color={colors.primary} />
        <Text className="font-oswald-bold text-foreground text-xl">
          Watchway
        </Text>
      </View>

      <View className="flex-row gap-4 items-center">
        <Pressable>
          <Ionicons name="search-outline" size={24} color={colors.foreground} />
        </Pressable>
        <Pressable>
          <MaterialIcons
            name="person-outline"
            size={24}
            color={colors.foreground}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
