import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Router } from "expo-router";
import { userType } from "@/lib/types";
import { AppButton } from "./AppButton";
import AppHeader from "./AppHeader";
type UserHeaderProps = {
  router: Router;
  user: userType;
};
export default function UserHeader({ router, user }: UserHeaderProps) {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AppHeader title="Profile" showBackButton={true} />
    </View>
  );
}

const styles = StyleSheet.create({});
