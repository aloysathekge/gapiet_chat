import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import { ScreenContent } from "@/components/ScreenContent";
import { hp, wp } from "@/helpers/common";
import { AppButton } from "@/components/AppButton";
import { useSignOut, useSupabase } from "@/providers/supabase-provider";
import { fetchPost, useGetUser } from "@/hooks/queries";
import MainHeader from "@/components/MainHeader";
import { theme } from "@/constants/theme";
import { PostWithUser } from "@/lib/types";
import PostCard from "@/components/PostCard";
import { useRouter } from "expo-router";

export default function Home() {
  const { error, isError, isLoading, signOut } = useSignOut();
  const { userProfile: data, user } = useSupabase();
  const { data: ass } = useGetUser(user?.id ?? "");
  const [posts, setPosts] = useState<PostWithUser[] | null>([]);
  const router = useRouter();

  console.log(" users data are not:", data?.name);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const posts = await fetchPost(10);
    console.log("Post results are", posts);

    setPosts(posts ?? null);
    posts?.forEach((post) => {
      console.log(post?.user.name);
    });
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
            <PostCard item={item} currentUser={user} router={router} />
          )}
        />
        <AppButton label="logout" onPress={signOut} loading={isLoading} />
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
