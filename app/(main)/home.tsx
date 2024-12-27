import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import { ScreenContent } from "@/components/ScreenContent";
import { hp, wp } from "@/helpers/common";
import { AppButton } from "@/components/AppButton";
import { useSignOut, useSupabase } from "@/providers/supabase-provider";
import { fetchPost, fetchUserData, useGetUser } from "@/hooks/queries";
import MainHeader from "@/components/MainHeader";
import { theme } from "@/constants/theme";
import { PostWithUser } from "@/lib/types";
import PostCard from "@/components/PostCard";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
let limit = 0;

export default function Home() {
  const { userProfile: data, user } = useSupabase();
  const { data: ass } = useGetUser(user?.id ?? "");
  const [posts, setPosts] = useState<PostWithUser[] | null>([]);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const handlePostEvent = async (payload: any) => {
    if (payload.eventType == "INSERT" && payload?.new?.id) {
      const newPost = { ...payload.new };
      const result = await fetchUserData(newPost.userId);
      console.log("result form getuser", result.data);
      newPost.user = result && result.isSuccess ? result.data : null;
      setPosts((prevPosts) =>
        prevPosts ? [newPost, ...prevPosts] : [newPost]
      );
    } else if (payload.eventType === "DELETE" && payload?.old?.id) {
      setPosts(
        (prevPosts) =>
          prevPosts?.filter((post) => post.id !== payload.old.id) ?? null
      );
    }
  };
  useEffect(() => {
    const postChannel = supabase
      .channel("posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        handlePostEvent
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postChannel);
    };
  }, []);

  const getPosts = async () => {
    limit = limit + 5;
    if (!hasMore) return null;
    console.log("fetch how many post", limit);
    const postsResult = await fetchPost(limit);
    if (postsResult) {
      if (posts?.length == postsResult.length) setHasMore(false);
      setPosts(postsResult ?? null);
    }
  };
  const onEditPost = async (item: any) => {
    // Edit Post
    console.log("Delete post", item);
  };

  const onDeletePost = async (item: any) => {
    // Delete Post

    console.log("Delete post", item);
  };

  return (
    <AppScreenContainer containerStyle={{ backgroundColor: "#fff" }}>
      <MainHeader />
      <ScreenContent style={{ paddingHorizontal: wp(5) }}>
        <FlatList
          keyExtractor={(item: PostWithUser) => item.id.toString()}
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          renderItem={({ item }) => (
            <PostCard
              item={item}
              currentUser={user}
              router={router}
              onDelete={onEditPost}
              onEdit={onDeletePost}
              showDelete={false}
            />
          )}
          ListFooterComponent={
            hasMore ? (
              <View
                style={{
                  marginVertical: posts !== null && posts.length > 0 ? 30 : 200,
                }}
              >
                <ActivityIndicator size={20} color={theme.colors.primary} />
              </View>
            ) : (
              <View style={{ marginVertical: 30 }}>
                <Text style={styles.noPosts}>No more post!</Text>
              </View>
            )
          }
          onEndReachedThreshold={0}
          onEndReached={() => {
            getPosts();
            console.log("reached the end");
          }}
        />
      </ScreenContent>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4),
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text,
  },
  avatarImage: {
    borderColor: theme.colors.gray,
    borderWidth: 3,
  },
  pill: {
    position: "absolute",
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: theme.colors.roseLight,
  },
});
