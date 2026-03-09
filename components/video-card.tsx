import { IVideo } from "@/services/types";
import { Image, Text, View } from "react-native";
import { formatViews, formatTimeAgo } from "@/utils/helpers";

interface VideoCardProps {
  video: IVideo;
}

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <View className="flex-1">
      <Image
        source={{ uri: video.thumbnail }}
        className="w-full h-48 rounded-2xl self-start"
      />
      <View className="flex-row gap-2 py-1.5">
        <Image
          source={{ uri: video.owner.avatar }}
          className="w-8 h-8 rounded-full"
        />
        <View className="flex-1 flex-col gap-0">
          <Text className="text-foreground font-inter-semibold text-base line-clamp-2 leading-normal">
            {video.title}
          </Text>

          <View className="flex-1 flex-row items-center gap-0.5">
            <Text className="text-muted font-inter-semibold text-2xs ">
              {video.owner.fullName}
            </Text>
            <Text className="text-muted font-bold text-base ">·</Text>
            <Text className="text-muted font-inter-semibold text-2xs ">
              {formatViews(video.views)} views
            </Text>
            <Text className="text-muted font-bold text-base ">·</Text>
            <Text className="text-muted font-inter-semibold text-2xs ">
              {formatTimeAgo(video.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VideoCard;
