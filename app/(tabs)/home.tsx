import VideoCard from "@/components/video-card";
import { endpoints } from "@/config/endpoints";
import { useVideoList } from "@/services/video-service";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  const { data, isLoading, error } = useVideoList();
  const videos = data?.data?.data?.docs;
  return (
    <View className="flex-1 items-center justify-center bg-background">
      {isLoading && <Text className="text-foreground">Loading...</Text>}
      {error && <Text className="text-foreground">Error: {error.message}</Text>}

      <FlatList
        data={videos}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item._id}
        contentContainerClassName="gap-4"
        className="w-full p-2"
      />
    </View>
  );
}
