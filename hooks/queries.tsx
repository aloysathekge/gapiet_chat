import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useSupabase } from "@/providers/supabase-provider";
import { userType } from "@/lib/types";

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
