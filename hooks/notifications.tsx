import { supabase } from "@/lib/supabase";
import { NotificationType } from "@/lib/types";

export const createNotification = async (notification: any) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) {
      console.log(" could create a notification", error);
    }
    console.log("Notifications created");
    return data;
  } catch (error) {
    console.log("could not create a notification", error);
  }
};

// Fetch post details
// Define the notification type
type NotificationResponse = NotificationType[];

export const fetchPostNotifications = async (
  userId: string
): Promise<NotificationResponse | null> => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("receiverId", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching notifications:", error);
      return null;
    }

    // Cast the data to ensure type safety
    return data as NotificationResponse;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return null;
  }
};
