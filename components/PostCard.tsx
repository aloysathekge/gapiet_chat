import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { PostWithUser, userType } from "@/lib/types";
import { Router } from "expo-router";
import { User } from "@supabase/supabase-js";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import Avatar from "./Avatar";
import useGetUserImage, { getImageFromUser } from "@/app/utils/getUserImage";

type postCardProps = {
  item: PostWithUser;
  router: Router;
  currentUser: User | null;
  hasShadow?: boolean;
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
          <View>
            <Text style={styles.username}>{item.user.name}</Text>
          </View>
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
