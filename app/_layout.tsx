import { useAppTheme } from "@/hooks/use-app-theme";
import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "../global.css";

export default function RootLayout() {
  const { colors, navigationTheme, statusBarStyle } = useAppTheme();

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={colors.background}
      />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
