import AuthBrand from "@/components/auth-brand";
import FormInput from "@/components/form-input";
import { Colors } from "@/config/theme";
import { SignInFormData, signInSchema } from "@/lib/validations/auth";
import { useLogin } from "@/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const { mutateAsync, isPending, error } = useLogin();
  const authLogin = useAuthStore((s) => s.login);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await mutateAsync(data);
      const { loggedInUser, accessToken, refreshToken } = response.data.data;
      await authLogin(loggedInUser, accessToken, refreshToken);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error(
        "Login failed:",
        error?.response?.data?.message ?? error.message,
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerClassName="justify-center px-6 py-6"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <AuthBrand subtitle="Sign in to your account" />

        {/* Form */}
        <View className="w-full">
          <FormInput
            control={control}
            name="userId"
            label="Email or Username"
            placeholder="Enter your email or username"
            keyboardType="email-address"
          />

          <FormInput
            control={control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            secureTextEntry
          />

          {error && (
            <View className=" p-1">
              <Text className="font-inter text-sm text-primary">
                {(error as any)?.response?.data?.message ??
                  "Login failed. Please try again."}
              </Text>
            </View>
          )}

          <Pressable
            className="bg-primary rounded-xl h-12 items-center justify-center mt-2 active:opacity-80"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? (
              <ActivityIndicator color={Colors.light.surface} />
            ) : (
              <Text className="font-inter-semibold text-base text-white">
                Sign In
              </Text>
            )}
          </Pressable>
        </View>

        <View className="flex-row justify-center mt-8">
          <Text className="font-inter text-sm text-muted">
            Don't have an account?{" "}
          </Text>
          <Link href="/sign-up" asChild>
            <Pressable>
              <Text className="font-inter-semibold text-sm text-primary">
                Sign Up
              </Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
