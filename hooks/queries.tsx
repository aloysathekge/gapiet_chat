import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSupabase } from "@/providers/supabase-provider";
import {
  CreateLike,
  postLikeType,
  postType,
  PostWithUser,
  userType,
} from "@/lib/types";
import { uploadFile } from "@/app/utils/getUserImage";
import * as fileSystem from "expo-file-system";

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

export const fetchUserData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
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
      .select(`*,user:users(id, name, image),postLikes(*)`)
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

// createPostLike

export const createPostLike = async (postLike: CreateLike) => {
  try {
    const { data, error } = await supabase
      .from("postLikes")
      .insert(postLike)
      .select()
      .single();

    if (error) {
      console.log(" could create a post like", error);
    }
    return data;
  } catch (error) {
    console.log("could not create a post", error);
  }
};

// removePost Like

export const removePostLike = async (
  postId: number,
  userId: string | undefined
) => {
  try {
    const { error } = await supabase
      .from("postLikes")
      .delete()
      .eq("userId", userId)
      .eq("postId", postId);

    if (error) {
      console.log(" could create a post like", error);
    }
    return error?.message;
  } catch (error) {
    console.log("could not create a post", error);
  }
};

export const downloadFile = async (url: string) => {
  try {
    const { uri } = await fileSystem.downloadAsync(url, getLocalFilePath(url));
    return uri;
  } catch (error) {}
};

export const getLocalFilePath = (filePath: string) => {
  const fileName = filePath.split("/").pop();
  return `${fileSystem.documentDirectory}${fileName}`;
};
