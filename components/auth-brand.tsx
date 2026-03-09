import { useAppTheme } from "@/hooks/use-app-theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native";

interface AuthBrandProps {
  subtitle: string;
}

export default function AuthBrand({ subtitle }: AuthBrandProps) {
  const { colors } = useAppTheme();

  return (
    <View className="items-center mb-10">
      <View className="flex-row items-center gap-2 mb-2">
        <MaterialIcons name="ondemand-video" size={32} color={colors.primary} />
        <Text className="font-oswald-bold text-3xl text-neutral-800 dark:text-foreground">
          Watchway
        </Text>
      </View>
      <Text className="font-inter  text-neutral-600  dark:text-muted text-sm">{subtitle}</Text>
    </View>
  );
}
