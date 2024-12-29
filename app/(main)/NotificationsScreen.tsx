import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppScreenContainer } from "@/components/AppScreenContainer";
import { fetchPostNotifications } from "@/hooks/notifications";
import { useSupabase } from "@/providers/supabase-provider";
import { NotificationType } from "@/lib/types";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import NotificationItem from "@/components/NotificationItem";
import AppHeader from "@/components/AppHeader";
import { useRouter } from "expo-router";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { user } = useSupabase();
  const router = useRouter();
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    let notificationResult = await fetchPostNotifications(user?.id ?? "");
    if (notificationResult) {
      setNotifications(notificationResult);
    }
  };
  return (
    <AppScreenContainer>
      <AppHeader title="Notifications" showBackButton mB={30} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listStyle}
      >
        {notifications.map((notification) => (
          <NotificationItem
            item={notification}
            router={router}
            key={notification?.id}
          />
        ))}
        {notifications.length == 0 && (
          <Text style={styles.noData}>No notifications</Text>
        )}
      </ScrollView>
    </AppScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(4),
  },

  listStyle: {
    paddingVertical: 20,
    gap: 10,
  },
  noData: {
    fontSize: hp(1.8),
    fontWeight: "600",
    color: theme.colors.text,
    textAlign: "center",
  },
});
