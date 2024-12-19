import { useSupabase } from "@/providers/supabase-provider";

export const useGetUserImage = () => {
  const { userProfile } = useSupabase();

  const getUserImage = () => {
    if (userProfile?.image && userProfile.image !== "") {
      return { uri: userProfile.image };
    } else {
      return require("@/assets/images/defaultUser.png");
    }
  };

  return getUserImage;
};

export default useGetUserImage;
