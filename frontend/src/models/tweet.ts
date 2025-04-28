import { Tweet } from "../types/tweet";
import { get, post, put, del } from "../helper/api_helper";
import { RESOURCES } from "../constants/resources";

export const getTweets = async (): Promise<Tweet[]> => {
  const response = await get(RESOURCES.TWEETS);
  return response.data;
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
