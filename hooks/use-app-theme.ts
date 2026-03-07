import { Colors, ThemeTokens, type AppColorScheme } from "@/config/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  type Theme as NavigationTheme,
} from "@react-navigation/native";
import { useMemo } from "react";

const BaseNavigationThemes = {
  light: DefaultTheme,
  dark: DarkTheme,
} as const;

type UseAppThemeResult = {
  colorScheme: AppColorScheme;
  colors: (typeof Colors)["light"];
  statusBarStyle: (typeof ThemeTokens)["light"]["statusBarStyle"];
  navigationTheme: NavigationTheme;
};

export function useAppTheme(): UseAppThemeResult {
  const colorScheme = (useColorScheme() ?? "light") as AppColorScheme;
  const colors = Colors[colorScheme];
  const tokens = ThemeTokens[colorScheme];
  const baseTheme = BaseNavigationThemes[colorScheme];

  const navigationTheme = useMemo(
    () => ({
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        background: colors.background,
        card: colors.background,
        text: colors.foreground,
        primary: colors.primary,
        border: colors.border,
        notification: colors.primary,
      },
    }),
    [baseTheme, colors],
  );

  return {
    colorScheme,
    colors,
    statusBarStyle: tokens.statusBarStyle,
    navigationTheme,
  };
}
