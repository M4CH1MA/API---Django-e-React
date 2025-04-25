import { Permission } from "./Permission";

export type User = {
    name: string;
    email: string;
    senha: string;
}

export type UserEnterpriseDetail = {
    is_owner: boolean;
    permissions: Permission[];
}

export type ApiGetUser = {
    user: User;
    enterprise: UserEnterpriseDetail;
}

export type ApiSignIn = {
    user: User;
    enterprise: UserEnterpriseDetail;
    refrash: string;
    access: string;
}