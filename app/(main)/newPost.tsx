import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import AppHeader from "@/components/AppHeader";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { useSupabase } from "@/providers/supabase-provider";
import useGetUserImage from "../utils/getUserImage";
import RichTextEditor from "@/components/RichTextEditor";
import { useRouter } from "expo-router";

export default function NewPost() {
  const { userProfile: user } = useSupabase();
  const getUserImage = useGetUserImage();

  const bodyRef = useRef("");
  const editorRef = useRef("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  return (
    <AppScreenContainer>
      <AppHeader title="Create Post" mB={30} showBackButton />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            padding: theme.Units.medium,
            gap: 20,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Avatar */}
          <View style={styles.header}>
            <Avatar
              uri={getUserImage()}
              rounded={theme.radius.xl}
              size={hp(6.5)}
            />
            <View style={{ gap: 2 }}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.public}>public</Text>
            </View>
          </View>
          <View style={styles.textEditor}>
            <RichTextEditor />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 15,
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "600",
    color: theme.colors.text,
    textAlign: "center",
  },
  public: {
    fontSize: hp(1.7),
    fontWeight: "600",
    color: theme.colors.text,
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontSize: hp(2.2),
    fontWeight: "700",
    color: theme.colors.textLight,
  },
  textEditor: {
    backgroundColor: "red",
  },
});
