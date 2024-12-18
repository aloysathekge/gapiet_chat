import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import { ScreenContent } from "@/components/ScreenContent";
import { wp } from "@/helpers/common";
import { AppButton } from "@/components/AppButton";
import { useSignOut, useSupabase } from "@/providers/supabase-provider";
import { useGetUser } from "@/hooks/queries";

export default function home() {
  const { error, isError, isLoading, signOut } = useSignOut();
  const { user } = useSupabase();
  const { data } = useGetUser(user?.id ?? "");
  console.log(" users data are", data);
  return (
    <AppScreenContainer>
      <ScreenContent style={{ paddingHorizontal: wp(10) }}>
        <Text>home</Text>
        <AppButton label="logout" onPress={signOut} loading={isLoading} />
      </ScreenContent>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({});
