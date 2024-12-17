import { SupabaseProvider, useSupabase } from "@/providers/supabase-provider";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  function AuthenticatedLayout() {
    const { session, initialized } = useSupabase();

    if (!initialized) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    console.log("session:", session);
    return <Stack screenOptions={{ headerShown: false }} />;
  }
  return (
    <SupabaseProvider>
      <AuthenticatedLayout />
    </SupabaseProvider>
  );
}
