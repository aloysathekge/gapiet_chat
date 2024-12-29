import { supabase } from "@/lib/supabase";

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
