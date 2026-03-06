/**
 * Design system color tokens — aligned with global.css CSS custom properties.
 *
 * CSS variable    | JS key        | Purpose
 * ─────────────────────────────────────────────────────────────────────────
 * --primary       | primary       | Brand / interactive action color
 * --background    | background    | Page / screen background
 * --surface       | surface       | Card, modal, elevated surface
 * --foreground    | foreground    | Primary text
 * --muted         | muted         | Secondary / subdued text
 * --subtle        | subtle        | Subtle backgrounds (inputs, chips)
 * --border        | border        | Dividers and borders
 * --overlay       | overlay       | Modal backdrop
 * --accent        | accent        | Soft accent background (icon wells)
 * ─────────────────────────────────────────────────────────────────────────
 */

import type { StatusBarStyle } from "react-native";
import { Platform } from "react-native";

export const Colors = {
  light: {
    primary: "#E53935",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    foreground: "#11181C",
    muted: "#687076",
    subtle: "#F3F4F6",
    border: "#E5E7EB",
    overlay: "rgb(0 0 0 / 50%)",
    accent: "#FEF2F2",
  },
  dark: {
    primary: "#E53935",
    background: "#151718",
    surface: "#1D2125",
    foreground: "#ECEDEE",
    muted: "#9BA1A6",
    subtle: "#252A2E",
    border: "#252A2E",
    overlay: "rgb(0 0 0 / 60%)",
    accent: "#2C1A1A",
  },
};

export type AppColorScheme = keyof typeof Colors;
export type AppColors = (typeof Colors)["light"];

export const ThemeTokens: Record<
  AppColorScheme,
  {
    statusBarStyle: StatusBarStyle;
  }
> = {
  light: {
    statusBarStyle: "dark-content",
  },
  dark: {
    statusBarStyle: "light-content",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
