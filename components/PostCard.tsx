import {
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect } from "react";
import { PostWithUser, userType } from "@/lib/types";
import { Router } from "expo-router";
import { User } from "@supabase/supabase-js";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
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
  const openPostDetails = () => {};
  const postTime = moment(item.created_at).format("h:mm A · MMM D, YYYY");
  console.log(item.user.image);
  const liked = false;
  const likes = [];

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
        <TouchableOpacity onPress={openPostDetails}>
          <Entypo
            name="dots-three-horizontal"
            size={18}
            color={theme.colors.text}
          />
        </TouchableOpacity>
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
          <TouchableOpacity style={{}}>
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
          <TouchableOpacity style={{}}>
            <MaterialCommunityIcons
              name="comment-text-outline"
              size={20}
              color="black"
              fill={"red"}
            />
          </TouchableOpacity>
          <Text style={styles.count}>{likes.length}</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity style={{}}>
            <Ionicons name="share-social-outline" size={24} color="black" />
          </TouchableOpacity>
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
