import { useAppTheme } from "@/hooks/use-app-theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const UploadScreen = () => {
  const router = useRouter();
  const { colors } = useAppTheme();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoSelected, setVideoSelected] = useState(false);
  const [thumbnailUri, setThumbnailUri] = useState<string | null>(null);

  const handleSelectVideo = () => {
    // TODO: integrate expo-image-picker for video selection
    setVideoSelected(true);
  };

  const handleSelectThumbnail = () => {
    // TODO: integrate expo-image-picker for thumbnail selection
  };

  const handleUpload = () => {
    // TODO: implement upload logic
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top", "bottom"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between border-b border-border px-4 pb-3 pt-4">
        <Pressable
          onPress={() => router.back()}
          className="h-9 w-9 items-center justify-center rounded-full bg-subtle"
          hitSlop={8}
        >
          <Ionicons name="close" size={20} color={colors.foreground} />
        </Pressable>

        <Text className="text-base font-semibold text-foreground">
          Upload Video
        </Text>

        <Pressable
          onPress={handleUpload}
          disabled={!videoSelected || !title.trim()}
          className="rounded-lg bg-primary px-4 py-1.5 disabled:opacity-40"
        >
          <Text className="text-sm font-semibold text-white">Post</Text>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 py-5 gap-5"
        keyboardShouldPersistTaps="handled"
      >
        {/* Video picker */}
        <Pressable
          onPress={handleSelectVideo}
          className="h-48 items-center justify-center rounded-2xl border-2 border-dashed border-border bg-subtle"
        >
          {videoSelected ? (
            <View className="items-center gap-2">
              <Ionicons name="videocam" size={36} color={colors.primary} />
              <Text className="text-sm font-medium text-foreground">
                Video selected
              </Text>
              <Text className="text-xs text-muted">Tap to change</Text>
            </View>
          ) : (
            <View className="items-center gap-2">
              <View className="h-14 w-14 items-center justify-center rounded-full bg-accent">
                <Ionicons
                  name="cloud-upload-outline"
                  size={28}
                  color={colors.primary}
                />
              </View>
              <Text className="text-sm font-semibold text-foreground">
                Select a video
              </Text>
              <Text className="text-xs text-muted">MP4, MOV up to 500 MB</Text>
            </View>
          )}
        </Pressable>

        {/* Thumbnail picker */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-foreground">
            Thumbnail
          </Text>
          <Pressable
            onPress={handleSelectThumbnail}
            className="h-36 items-center justify-center overflow-hidden rounded-xl border border-border bg-subtle"
          >
            {thumbnailUri ? (
              <Image
                source={{ uri: thumbnailUri }}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <View className="items-center gap-2">
                <Ionicons name="image-outline" size={28} color={colors.muted} />
                <Text className="text-xs text-muted">
                  Add a thumbnail (optional)
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* Title */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-foreground">Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Add a title..."
            placeholderTextColor={colors.muted}
            maxLength={100}
            className="rounded-xl border border-border bg-subtle px-4 py-3 text-sm text-foreground"
          />
          <Text className="self-end text-xs text-muted">
            {title.length}/100
          </Text>
        </View>

        {/* Description */}
        <View className="gap-2">
          <Text className="text-sm font-semibold text-foreground">
            Description
          </Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            placeholder="Describe your video..."
            placeholderTextColor={colors.muted}
            multiline
            numberOfLines={4}
            maxLength={500}
            textAlignVertical="top"
            className="min-h-24 rounded-xl border border-border bg-subtle px-4 py-3 text-sm text-foreground"
          />
          <Text className="self-end text-xs text-muted">
            {description.length}/500
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadScreen;
