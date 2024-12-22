import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSupabase } from "@/providers/supabase-provider";
import { postType, PostWithUser, userType } from "@/lib/types";
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
    if (post.file && typeof post.file === "object") {
      let isImage = post?.file?.type == "image";
      let folderName = isImage ? "postImages" : "postVideos";

      const fileResult = await uploadFile(
        folderName,
        { uri: post?.file?.uri },
        isImage
      );
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
    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      console.error("could not update or create a post", error);
      return null;
    }

    return data;
  } catch (error) {
    console.log("outer could not update or create a post", error);
  }
};

export const fetchPost = async (
  limit: number
): Promise<PostWithUser[] | null | undefined> => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`*,user:users(id, name, image)`)
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.log("outer could fetch a post", error);
    }
    return data as PostWithUser[];
  } catch (error) {
    console.log("outer could fetch a post", error);
  }
};
