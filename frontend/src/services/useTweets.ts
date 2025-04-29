import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllTweets, createTweet, updateTweet, deleteTweet, getMyTweets } from '../models/tweet';
import { TWEETS_LIMIT } from "../config/constants";

export const useTweetsQuery = (activeTab: "all" | "mine") => {
  return useInfiniteQuery({
    queryKey: ["tweets", activeTab],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => {
      if (activeTab === "all") {
        return getAllTweets({ pageParam, limit: TWEETS_LIMIT });
      } else {
        return getMyTweets({ pageParam, limit: TWEETS_LIMIT });
      }
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets", "all"] });
      queryClient.invalidateQueries({ queryKey: ["tweets", "mine"] });

    },
  });
};

export const useUpdateTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) => updateTweet(id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tweets", "all"] });
      queryClient.invalidateQueries({ queryKey: ["tweets", "mine"] });

    },
  });
};

export const useDeleteTweet = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => deleteTweet(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tweets", "all"] });
      queryClient.invalidateQueries({ queryKey: ["tweets", "mine"] });

      },
    });
  };
