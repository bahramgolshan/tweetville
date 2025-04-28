import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTweets, createTweet, updateTweet, deleteTweet } from '../models/tweet';
import { Tweet } from '../types/tweet';

export const useTweets = () => {
  return useQuery<Tweet[]>({
    queryKey: ['tweets'],
    queryFn: getTweets,
  });
};

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });
};

export const useUpdateTweet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) => updateTweet(id, text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets'] });
    },
  });
};

export const useDeleteTweet = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => deleteTweet(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tweets'] });
      },
    });
  };
