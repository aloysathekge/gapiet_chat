import QueryProvider from "@/providers/QueryProvider";
import { SupabaseProvider, useSupabase } from "@/providers/supabase-provider";
import { Redirect, Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

export default function RootLayout() {
  function AuthenticatedLayout() {
    const { session, initialized } = useSupabase();
    const router = useRouter();
    const segments = useSegments();
    useEffect(() => {
      if (!initialized) return;
      const inMainGroup = segments[0] === "(main)";
      const inAuthGroup = segments[0] === "login" || segments[0] === "signup";

      if (session && !inMainGroup) {
        router.replace("/(main)/home");
      } else if (!session && !inAuthGroup) {
        router.replace("/welcomeScreen");
      }
    }, [initialized, session, segments]);

    // if (!initialized) {
    //   return (
    //     <View
    //       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    //     >
    //       <ActivityIndicator size="large" />
    //     </View>
    //   );
    // }

    return null;
  }
  return (
    <QueryProvider>
      <SupabaseProvider>
        <Slot />
        <AuthenticatedLayout />
      </SupabaseProvider>
    </QueryProvider>
  );
}
