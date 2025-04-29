import { Tweet } from "../types/tweet";
import { get, post, put, del } from "../helper/api_helper";
import { RESOURCES } from "../config/constants";

interface GetTweetsParams {
  pageParam?: number;
  limit?: number;
}
export const getAllTweets = async ({ pageParam = 1, limit = 5  }: GetTweetsParams): Promise<{ tweets: Tweet[]; nextPage: number | null}> => {
  const response = await get(`${RESOURCES.TWEETS}?page=${pageParam}&limit=${limit}`);
  const data = response.data
  return {
    tweets: data.tweets,
    nextPage: data.tweets.length < limit ? null : pageParam + 1,
  };
};

export const getMyTweets = async ({ pageParam = 1, limit = 5  }: GetTweetsParams): Promise<{ tweets: Tweet[]; nextPage: number | null}> => {
  const response = await get(`${RESOURCES.TWEETS}/my-tweets?page=${pageParam}&limit=${limit}`);
  const data = response.data
  return {
    tweets: data.tweets,
    nextPage: data.tweets.length < limit ? null : pageParam + 1,
  };
};

export const getTweet = async (id: number): Promise<Tweet> => {
  const response = await get(`${RESOURCES.TWEETS}/${id}`);
  return response.data;
};

export const createTweet = async (text: string): Promise<Tweet> => {
  const response = await post(RESOURCES.TWEETS, { text });
  return response.data;
};

export const updateTweet = async (id: number, text: string): Promise<Tweet> => {
  const response = await put(`${RESOURCES.TWEETS}/${id}`, { text });
  return response.data;
};

export const deleteTweet = async (id: string): Promise<void> => {
  await del(`${RESOURCES.TWEETS}/${id}`);
};
