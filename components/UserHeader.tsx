import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Router } from "expo-router";
import { userType } from "@/lib/types";
import { AppButton } from "./AppButton";
import AppHeader from "./AppHeader";
import { hp, wp } from "@/helpers/common";
import Icon from "@/assets/icons";
import { FontAwesome } from "@expo/vector-icons";
type UserHeaderProps = {
  router: Router;
  user: userType;
  style?: ViewStyle;
};
export default function UserHeader({ router, user, style }: UserHeaderProps) {
  return (
    <View
      style={[
        {
          flexDirection: "row",

          backgroundColor: "#fff",
          paddingHorizontal: wp(4),
        },
        style,
      ]}
    >
      <View style={{ flex: 1 }}>
        <AppHeader title="Profile" showBackButton={true} mB={30} />
        <TouchableOpacity style={styles.menuDots}>
          <FontAwesome name="ellipsis-v" size={20} color="" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuDots: {
    position: "absolute",
    right: 0,
    padding: 5,
  },
});
