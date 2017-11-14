export interface User {
    username: string;
    password: string;
}

export interface UserClaims {
    username: string;
    id: string;
    expirationTime?: number;
}