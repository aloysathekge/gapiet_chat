import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import UserHeader from "@/components/UserHeader";
import { useRouter } from "expo-router";
import { useSignOut, useSupabase } from "@/providers/supabase-provider";
import { ScreenContent } from "@/components/ScreenContent";
import Avatar from "@/components/Avatar";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import useGetUserImage from "../utils/getUserImage";
import Icon from "@/assets/icons";
import { Feather } from "@expo/vector-icons";
import { AppButton } from "@/components/AppButton";

export default function Profile() {
  const router = useRouter();
  const { userProfile: user, isLoading } = useSupabase();
  const { error, isError, isLoading: isSigningOut, signOut } = useSignOut();

  const getUserImage = useGetUserImage();
  return (
    <AppScreenContainer>
      <UserHeader router={router} user={user!} />
      <ScreenContent
        style={{ padding: theme.Units.medium }}
        loading={isLoading}
      >
        <View style={{ alignSelf: "center", height: hp(12), width: hp(12) }}>
          <Avatar
            uri={getUserImage()}
            rounded={theme.radius.xxl * 1.4}
            size={hp(12)}
          />

          <Pressable
            style={styles.editIcon}
            onPress={() => router.push("/(main)/EditProfileScreen")}
          >
            <Feather name="edit-3" size={24} color="black" />
          </Pressable>
        </View>
        {/* username and house number */}

        <View style={{ alignItems: "center", gap: 4 }}>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.address}>{user?.address}</Text>
        </View>

        <View style={{ gap: 10, marginTop: hp(4) }}>
          {/* bio and email, phone */}
          <View style={styles.info}>
            <Icon name="mail" size={20} color={theme.colors.textLight} />
            <Text>{user?.email ?? ""}</Text>
          </View>
        </View>
        <View style={{ gap: 10, marginTop: hp(4) }}>
          {/* bio and email, phone */}
          {user?.phone && (
            <View style={styles.info}>
              <Icon name="call" size={20} color={theme.colors.textLight} />
              <Text>{user?.phone ?? ""}</Text>
            </View>
          )}
        </View>
        <View style={{ gap: 10, marginTop: hp(4) }}>
          {/* bio and email, phone */}
          {user?.bio && <Text>{user?.bio ?? ""}</Text>}
        </View>
        {/* this will be move to somewhere appropriate */}
        <AppButton label="logout" onPress={signOut} loading={isSigningOut} />
      </ScreenContent>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "#fff",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  name: {
    fontSize: hp(3),
    fontWeight: "500",
    color: theme.colors.textDark,
    alignSelf: "center",
  },
  address: {},
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: theme.colors.textLight,
  },
});
