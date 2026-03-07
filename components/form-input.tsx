import { useAppTheme } from "@/hooks/use-app-theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { Pressable, Text, TextInput, type TextInputProps, View } from "react-native";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps["autoCapitalize"];
  keyboardType?: TextInputProps["keyboardType"];
};

export default function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = "none",
  keyboardType = "default",
}: FormInputProps<T>) {
  const { colors } = useAppTheme();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="mb-4">
          <Text className="font-inter-medium text-sm text-foreground mb-1.5">
            {label}
          </Text>
          <View
            className={`flex-row items-center rounded-xl px-4 h-12 bg-subtle border ${
              error ? "border-primary" : "border-border"
            }`}
          >
            <TextInput
              className="flex-1 text-foreground font-inter text-base h-full"
              placeholder={placeholder}
              placeholderTextColor={colors.muted}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry && !showPassword}
              autoCapitalize={autoCapitalize}
              keyboardType={keyboardType}
            />
            {secureTextEntry && (
              <Pressable
                onPress={() => setShowPassword((prev) => !prev)}
                hitSlop={8}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.muted}
                />
              </Pressable>
            )}
          </View>
          {error && (
            <Text className="font-inter text-xs text-primary mt-1">
              {error.message}
            </Text>
          )}
        </View>
      )}
    />
  );
}
