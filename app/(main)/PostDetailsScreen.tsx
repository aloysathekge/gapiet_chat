import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { createPostComment, fetchPostDetails } from "@/hooks/queries";
import { commentWithUser, CreateComment, PostWithUser } from "@/lib/types";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import PostCard from "@/components/PostCard";
import { useSupabase } from "@/providers/supabase-provider";
import AppTextInput from "@/components/AppTextInput";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import CommentItem from "@/components/CommentItem";

export default function PostDetailsScreen() {
  const { postId } = useLocalSearchParams();
  const { user: currentUser } = useSupabase();

  // console.log("Opened post with id ", postId);
  const [post, setPost] = useState<PostWithUser | null>(null);
  const router = useRouter();
  const { userProfile: data, user } = useSupabase();

  const [loadingPost, setLoadingPost] = useState(true);
  const [postingComment, setPostingComment] = useState(false);
  const [comment, setComment] = useState("");

  const inputRef = useRef<TextInput>(null);

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

  const onNewComment = async () => {
    if (!comment.trim()) return;

    if (!user?.id) {
      Alert.alert("Error", "You need to be logged in to like posts.");
      return;
    }

    if (post?.id) {
      let data = {
        userId: user?.id ?? "",
        postId: post?.id,
        text: comment,
      };
      setPostingComment(true);
      const commentResult = await createPostComment(data);
      setPostingComment(false);

      if (commentResult) {
        //Send Notifications
        console.log("Commented Post", commentResult);
        setComment("");
        if (inputRef.current) {
          inputRef.current.clear(); // Also clear the native input
        }
      }
    }
  };
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
          {post ? (
            <>
              <PostCard
                currentUser={user}
                item={post}
                router={router}
                showMoreIcons={false}
              />

              <View style={styles.inputContainer}>
                <AppTextInput
                  inputRef={inputRef}
                  placeholder="Type a comment"
                  onChangeText={setComment}
                  containerStyle={{
                    flex: 1,
                    height: hp(6.2),
                    borderRadius: theme.radius.xl,
                  }}
                />
                {postingComment ? (
                  <ActivityIndicator />
                ) : (
                  <TouchableOpacity
                    style={styles.sendIcon}
                    onPress={onNewComment}
                  >
                    <Ionicons
                      name="send-outline"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={{ marginVertical: 15, gap: 17 }}>
                {post.comments.map((comment) => (
                  <CommentItem
                    canDelete={
                      currentUser?.id == comment.userId ||
                      currentUser?.id == post.userId
                    }
                    key={comment.id.toString()}
                    item={comment as commentWithUser}
                  />
                ))}

                {post.comments.length == 0 && (
                  <Text style={{ color: theme.colors.text, marginLeft: 5 }}>
                    be the first to comment
                  </Text>
                )}
              </View>
            </>
          ) : (
            <View
              style={[
                styles.center,
                { justifyContent: "flex-start", marginTop: 100 },
              ]}
            >
              <Text style={styles.notFound}>
                Post not found! must have been deleted
              </Text>
            </View>
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
