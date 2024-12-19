import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import UserHeader from "@/components/UserHeader";
import { useRouter } from "expo-router";
import { useSupabase } from "@/providers/supabase-provider";

export default function Profile() {
  const router = useRouter();
  const { userProfile: user } = useSupabase();
  return (
    <AppScreenContainer>
      <UserHeader router={router} user={user!} />
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({});
