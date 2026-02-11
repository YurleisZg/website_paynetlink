export interface User {
    id: string;
    email: string;
    name: string;
    avatarUrl?: string;
}

export interface UserDto {
    id: string;
    email: string;
    name: string;
    avatar_url?: string;
}
