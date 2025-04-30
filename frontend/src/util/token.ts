import { User } from '@/types/user';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
    user: User;
}

export const decodeToken = (token: string): JwtPayload => {
    return jwtDecode<JwtPayload>(token);
};
