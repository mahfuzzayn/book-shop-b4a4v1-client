import { JwtPayload } from "jwt-decode";

export interface TUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    passwordChangedAt?: Date;
    role: "user" | "admin";
    isDeactivated: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CustomJwtPayload extends JwtPayload {
    role?: string;
}
