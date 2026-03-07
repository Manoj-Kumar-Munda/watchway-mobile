import AuthBrand from "@/components/auth-brand";
import FormInput from "@/components/form-input";
import { useAppTheme } from "@/hooks/use-app-theme";
import { cn } from "@/lib/cn";
import { RegisterFormData, registerSchema } from "@/lib/validations/auth";
import { useRegister } from "@/services/auth-service";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function SignUpScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const register = useRegister();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      avatar: "",
      coverImage: "",
    },
  });

  const avatarUri = watch("avatar");
  const coverUri = watch("coverImage");

  const pickImage = async (field: "avatar" | "coverImage") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: field === "avatar" ? [1, 1] : [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setValue(field, result.assets[0].uri, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("password", data.password);

      if (data.avatar) {
        const avatarFile = {
          uri: data.avatar,
          type: "image/jpeg",
          name: "avatar.jpg",
        } as any;
        formData.append("avatar", avatarFile);
      }

      if (data.coverImage) {
        const coverFile = {
          uri: data.coverImage,
          type: "image/jpeg",
          name: "cover.jpg",
        } as any;
        formData.append("coverImage", coverFile);
      }

      await register.mutateAsync(formData);
      router.replace("/sign-in");
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error?.response?.data?.message ?? error.message,
      );
    }
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior="padding">
      <ScrollView
        contentContainerClassName="px-6 py-8"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthBrand subtitle="Create your account" />

        <Controller
          control={control}
          name="coverImage"
          render={() => (
            <Pressable
              className="w-full h-36 rounded-2xl bg-subtle border border-dashed border-border items-center justify-center mb-4 overflow-hidden"
              onPress={() => pickImage("coverImage")}
            >
              {coverUri ? (
                <Image
                  source={{ uri: coverUri }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="items-center">
                  <Ionicons
                    name="image-outline"
                    size={28}
                    color={colors.muted}
                  />
                  <Text className="font-inter text-xs text-muted mt-1">
                    Tap to add cover image
                  </Text>
                </View>
              )}
            </Pressable>
          )}
        />

        <Controller
          control={control}
          name="avatar"
          render={({ fieldState: { error } }) => (
            <View className="items-center -mt-14 mb-6 z-10">
              <Pressable
                className={cn(
                  "w-24 h-24 rounded-full bg-subtle border-4 items-center justify-center overflow-hidden",
                  error ? "border-primary" : "border-background",
                )}
                onPress={() => pickImage("avatar")}
              >
                {avatarUri ? (
                  <Image
                    source={{ uri: avatarUri }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="items-center">
                    <Ionicons
                      name="camera-outline"
                      size={24}
                      color={colors.muted}
                    />
                  </View>
                )}
              </Pressable>
              {error && (
                <Text className="font-inter text-xs text-primary mt-1">
                  {error.message}
                </Text>
              )}
              <Text className="font-inter text-xs text-muted mt-1">
                Profile Photo *
              </Text>
            </View>
          )}
        />

        <View className="w-full">
          <FormInput
            control={control}
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            autoCapitalize="words"
          />

          <FormInput
            control={control}
            name="username"
            label="Username"
            placeholder="Choose a username"
          />

          <FormInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <FormInput
            control={control}
            name="password"
            label="Password"
            placeholder="Create a password"
            secureTextEntry
          />

          {register.error && (
            <View className="bg-accent rounded-lg p-3 mb-4">
              <Text className="font-inter text-sm text-primary text-center">
                {(register.error as any)?.response?.data?.message ??
                  "Registration failed. Please try again."}
              </Text>
            </View>
          )}

          <Pressable
            className="bg-primary rounded-xl h-12 items-center justify-center mt-2 active:opacity-80"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || register.isPending}
          >
            {isSubmitting || register.isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="font-inter-semibold text-base text-white">
                Create Account
              </Text>
            )}
          </Pressable>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center mt-8 mb-4">
          <Text className="font-inter text-sm text-muted">
            Already have an account?{" "}
          </Text>
          <Link href="/sign-in" asChild>
            <Pressable>
              <Text className="font-inter-semibold text-sm text-primary">
                Sign In
              </Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
