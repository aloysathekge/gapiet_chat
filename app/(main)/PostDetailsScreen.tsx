import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchPostDetails } from "@/hooks/queries";
import { PostWithUser } from "@/lib/types";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import PostCard from "@/components/PostCard";
import { useSupabase } from "@/providers/supabase-provider";

export default function PostDetailsScreen() {
  const { postId } = useLocalSearchParams();
  console.log("Opened post with id ", postId);
  const [post, setPost] = useState<PostWithUser | null>(null);
  const router = useRouter();
  const { userProfile: data, user } = useSupabase();

  const [loadingPost, setLoadingPost] = useState(true);

  useEffect(() => {
    getPostDetails();
  }, []);

  const getPostDetails = async () => {
    if (typeof postId === "string") {
      // Narrow down to string
      const postDetails = await fetchPostDetails(postId);
      if (postDetails) {
        setPost(postDetails);
      }
      setLoadingPost(false);

      console.log(postDetails);
    } else {
      console.warn("Invalid postId: ", postId);
    }
  };

  if (loadingPost) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={20} />
      </View>
    );
  }
  return (
    <AppScreenContainer>
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
          {post && (
            <PostCard
              currentUser={user}
              item={post}
              router={router}
              showMoreIcons={false}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: wp(7),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  loading: {
    height: hp(5.8),
    width: hp(5.8),
    justifyContent: "center",
    alignItems: "center",
    transform: [{ scale: 1.3 }],
  },
  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  sendIcon: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.8,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
    height: hp(5.8),
    width: hp(5.8),
  },
});
