import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import { ScreenContent } from "@/components/ScreenContent";
import { wp } from "@/helpers/common";
import { AppButton } from "@/components/AppButton";
import { useSignOut, useSupabase } from "@/providers/supabase-provider";
import { fetchPost, useGetUser } from "@/hooks/queries";
import MainHeader from "@/components/MainHeader";

export default function Home() {
  const { error, isError, isLoading, signOut } = useSignOut();
  const { userProfile: data, user } = useSupabase();
  const { data: ass } = useGetUser(user?.id ?? "");
  const [posts, setPosts] = useState([]);

  console.log(" users data are not:", data?.name);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const posts = await fetchPost(10);
    console.log("Post results are", posts);

    posts?.forEach((post) => {
      console.log(post?.user.name);
    });
  };

  return (
    <AppScreenContainer containerStyle={{ backgroundColor: "#fff" }}>
      <MainHeader />
      <ScreenContent style={{ paddingHorizontal: wp(10) }}>
        <Text>home</Text>
      </ScreenContent>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({});
