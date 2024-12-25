import {
  ActivityIndicator,
  Alert,
  LogBox,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CreateLike, postLikeType, PostWithUser, userType } from "@/lib/types";
import { Router } from "expo-router";
import { User } from "@supabase/supabase-js";
import { theme } from "@/constants/theme";
import { hp, stripHtmlTags, wp } from "@/helpers/common";
import Avatar from "./Avatar";
import useGetUserImage, {
  getImageFromUser,
  getSupabaseFileUrl,
} from "@/app/utils/getUserImage";
import moment from "moment";
import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import PostDetailsScreen from "@/app/(main)/PostDetailsScreen";
import RenderHTML from "react-native-render-html";
import { Image } from "expo-image";
import { ResizeMode, Video } from "expo-av";
import Icon from "@/assets/icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { createPostLike, downloadFile, removePostLike } from "@/hooks/queries";
LogBox.ignoreLogs([
  "Warning: TNodeChildrenRenderer",
  "Warning: MemoizedTNodeRenderer",
  "Warning: TRenderEngineProvider",
]);
type postCardProps = {
  item: PostWithUser;
  router: Router;
  currentUser: User | null;
  hasShadow?: boolean;
  showMoreIcons?: boolean;
};

const textStyles = {
  color: theme.colors.dark,
  fontSize: hp(1.75),
};
const tagStyles = {
  div: textStyles,
  p: textStyles,
  al: textStyles,
  h1: {
    color: theme.colors.dark,
  },
  h4: {
    color: theme.colors.dark,
  },
};
export default function PostCard({
  item,
  router,
  currentUser,
  hasShadow = true,
  showMoreIcons = true,
}: postCardProps) {
  const shadowStyle: ViewStyle = {
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  };
  const postTime = moment(item.created_at).format("h:mm A · MMM D, YYYY");
  console.log(item.user.image);

  const [likes, setLikes] = useState<postLikeType[]>([]);
  const [comments, setComments] = useState([]);
  const [isSharing, setIsSharing] = useState(false);

  const liked = likes.some((like) => like?.userId === currentUser?.id);

  const onShare = async () => {
    try {
      setIsSharing(true);

      if (item.file) {
        const fileUrl = getSupabaseFileUrl(item.file).uri;
        console.log("File URL:", fileUrl); // Debug log

        // Fix the directory path - remove duplicate postImages
        const fileName = item.file || fileUrl.split("/").pop();
        const localUri = `${FileSystem.documentDirectory}${fileName}`;

        console.log("Downloading to:", localUri); // Debug log

        // Download directly to document directory
        await FileSystem.downloadAsync(fileUrl, localUri);

        // Share the local file
        await Sharing.shareAsync(localUri, {
          mimeType: item.file || "image/png",
          dialogTitle: stripHtmlTags(item.body),
        });
      } else {
        await Share.share({
          message: stripHtmlTags(item.body),
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const onLike = async () => {
    if (!currentUser?.id) {
      Alert.alert("Error", "You need to be logged in to like posts.");
      return;
    }
    if (liked) {
      let updatedLike = likes.filter(
        (prevLike) => prevLike.userId != currentUser?.id
      );

      setLikes([...updatedLike]);
      const result = await removePostLike(item.id, currentUser?.id);
      console.log("removed like", result);
    } else {
      const likeData: CreateLike = {
        userId: currentUser?.id ?? "",
        postId: item.id,
      };

      let result = await createPostLike(likeData);
      console.log("liked post", result);

      setLikes((prevLikes) => [...prevLikes, result]);
      if (!result) {
        Alert.alert("Something went wrong!");
      }
    }
  };

  const openPostDetails = () => {
    router.push({
      pathname: "/(main)/PostDetailsScreen",
      params: { postId: item?.id },
    });
  };

  useEffect(() => {
    setLikes(Array.isArray(item?.postLikes) ? item.postLikes : []);
    console.log(
      "Likes for post",
      item?.id,
      JSON.stringify(item?.postLikes, null, 2)
    );
  }, [item]);

  return (
    <View style={[styles.container, hasShadow && shadowStyle]}>
      <View style={styles.header}>
        {/* user info */}
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={getImageFromUser(item.user)}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>{item.user.name}</Text>
            <Text style={styles.postTime}>{postTime}</Text>
          </View>
        </View>
        {showMoreIcons && (
          <TouchableOpacity onPress={openPostDetails}>
            <Entypo
              name="dots-three-horizontal"
              size={18}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.postBody}>
          {item.body && (
            <RenderHTML
              source={{ html: item.body }}
              contentWidth={wp(100)}
              tagsStyles={tagStyles}
            />
          )}
        </View>
        {/* post Image */}
        <View>
          {item?.file &&
            (item.file.includes("postImage") ? (
              <Image
                source={getSupabaseFileUrl(item.file)}
                transition={100}
                contentFit="cover"
                style={styles.postMedia}
              />
            ) : (
              <Video
                source={getSupabaseFileUrl(item.file)}
                style={[styles.postMedia, { height: hp(30), flex: 1 }]}
                isLooping
                useNativeControls
                resizeMode={"cover" as ResizeMode}
              />
            ))}
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={onLike}>
            <Icon
              name="heart"
              size={20}
              fill={liked ? theme.colors.rose : "transparent"}
              color={liked ? theme.colors.rose : theme.colors.textLight}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes.length}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity style={{}} onPress={openPostDetails}>
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={20}
              color="black"
              fill={"red"}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{comments.length}</Text>
        </View>
        <View style={styles.footerButton}>
          {isSharing ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity style={{}} onPress={onShare}>
              <Ionicons name="share-social-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl,
    borderCurve: "continuous",
    padding: 10,
    paddingVertical: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    gap: 10,
  },
  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    fontWeight: "600",
  },
  username: {
    fontSize: hp(1.4),
    color: theme.colors.textDark,
    fontWeight: "600",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  postMedia: {
    height: hp(40),
    width: "100%",
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  postBody: {
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  footerButton: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  count: {
    color: theme.colors.text,
    fontSize: hp(1.8),
  },
});
