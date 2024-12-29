import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import UserHeader from "@/components/UserHeader";
import { useRouter } from "expo-router";
import { useSignOut, useSupabase } from "@/providers/supabase-provider";
import { ScreenContent } from "@/components/ScreenContent";
import Avatar from "@/components/Avatar";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import useGetUserImage from "../utils/getUserImage";
import Icon from "@/assets/icons";
import { Feather } from "@expo/vector-icons";
import { AppButton } from "@/components/AppButton";
import { PostWithUser } from "@/lib/types";
import { fetchPost, useGetUser } from "@/hooks/queries";
import PostCard from "@/components/PostCard";

export default function Profile() {
  const router = useRouter();
  const { user: currentUser, userProfile: user } = useSupabase();

  const { error, isError, isLoading: isSigningOut, signOut } = useSignOut();
  const [posts, setPosts] = useState<PostWithUser[] | null>([]);
  const [hasMore, setHasMore] = useState(true);

  let limit = 0;
  const getUserImage = useGetUserImage();

  const getPosts = async () => {
    limit = limit + 5;
    if (!hasMore) return null;
    console.log("fetch how many post", limit);
    const postsResult = await fetchPost(limit, user?.id);
    if (postsResult) {
      if (posts?.length == postsResult.length) setHasMore(false);
      setPosts(postsResult ?? null);
    }
  };

  const RenderHeader = () => {
    return (
      <View style={{ padding: theme.Units.medium }}>
        <UserHeader
          router={router}
          user={user!}
          style={{ backgroundColor: "" }}
        />
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
      </View>
    );
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
    <AppScreenContainer>
      <FlatList
        keyExtractor={(item: PostWithUser) => item.id.toString()}
        data={posts}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
        renderItem={({ item }) => (
          <PostCard
            item={item}
            currentUser={currentUser}
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

      <RenderHeader />
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
