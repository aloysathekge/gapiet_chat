import {
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { PostWithUser, userType } from "@/lib/types";
import { Router } from "expo-router";
import { User } from "@supabase/supabase-js";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import Avatar from "./Avatar";
import useGetUserImage, { getImageFromUser } from "@/app/utils/getUserImage";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import PostDetailsScreen from "@/app/(main)/PostDetailsScreen";
import RenderHTML from "react-native-render-html";
LogBox.ignoreLogs([
  "Warning: TNodeChildrenRenderer",
  "Warning: MemoizedTNodeRenderer",
  "Warning: TNodeChildrenRenderer",
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
