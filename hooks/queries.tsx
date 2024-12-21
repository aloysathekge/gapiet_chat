import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSupabase } from "@/providers/supabase-provider";
import { userType } from "@/lib/types";
import { uploadFile } from "@/app/utils/getUserImage";

export const useGetUser = (userId: string) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data as userType;
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      updates,
    }: {
      userId: string;
      updates: Partial<userType>;
    }) => {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const updateUser = async (userId: string, updates: Partial<userType>) => {
    try {
      const data = await mutation.mutateAsync({ userId, updates });
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  return {
    updateUser,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

// Updating or uploading Post,
export const createUpdatePost = async (post: any) => {
  try {
    console.log("post.file:", post.file?.uri);
    if (post.file && typeof post.file === "object") {
      let isImage = post?.file?.type == "image";
      let folderName = isImage ? "postImages" : "postVideos";

      const fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
      if (fileResult.success) post.file = fileResult.data;

      const { data, error } = await supabase
        .from("posts")
        .upsert(post)
        .select()
        .single();
      if (error) {
        console.log("could not update or create a post", error);
      }
      return data;
    }
  } catch (error) {
    console.log("outer could not update or create a post", error);
  }
};
