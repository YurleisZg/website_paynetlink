import { apiClient } from "@/shared/lib";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
    return data;
}
