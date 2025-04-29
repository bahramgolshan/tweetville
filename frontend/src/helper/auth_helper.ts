import {jwtDecode} from 'jwt-decode';
import { User } from '../types/user';

export const saveToken = (token: string) => {
    localStorage.setItem("access_token", token);
};

export const removeToken = () => {
    localStorage.removeItem("access_token");
};

export const getToken = (): string | null => {
    return localStorage.getItem("access_token");
};
  
interface JwtPayload {
    user: User;
}

export const decodeToken = (token: string): JwtPayload => {
    return jwtDecode<JwtPayload>(token);
};