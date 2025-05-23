import { post } from "../helper/api_helper";
import { RESOURCES } from "../config/constants";

export const signup = async (data: { email: string; password: string }) => {
  try {
    const response = await post(`${RESOURCES.AUTH}/signup`, data);
    if (response.status === 201 && response.data.accessToken) {
      return response.data;
    } else {
      throw new Error("Signup failed. No access token received.");
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Signup failed.");
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await post(`${RESOURCES.AUTH}/login`, data);
    if (response.status === 200 && response.data.accessToken) {
      return response.data;
    } else {
      throw new Error("Login failed. No access token received.");
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Login failed.");
  }
};

export const logout = async () => {
  try {
    const response = await post(`${RESOURCES.AUTH}/logout`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Logout failed.");
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Logout failed.");
  }
};
