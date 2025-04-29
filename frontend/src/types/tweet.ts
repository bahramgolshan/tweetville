import { User } from "./user";

export interface Tweet {
    _id: string;
    text: string;
    createdAt: string;
    updatedAt: string;
    user: User
  }
  