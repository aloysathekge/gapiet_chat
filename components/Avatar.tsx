import { Button, Image, StyleSheet, Text, View } from "react-native";
import { hp, wp } from "@/helpers/common";

import React from "react";
import { theme } from "@/constants/theme";
type avatarProps = {
  size: number;
  uri: string | { uri: string } | number;
  rounded: number;
  style: any;
};
export default function Avatar({ size, uri, rounded, style }: avatarProps) {
  return (
    <Image
      source={typeof uri === "string" ? { uri } : uri}
      resizeMode="cover"
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: rounded },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderCurve: "continuous",
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
  },
});
