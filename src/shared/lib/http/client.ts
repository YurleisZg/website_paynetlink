import axios, { type InternalAxiosRequestConfig } from "axios";
import { config } from "@/shared/config";

export const apiClient = axios.create({
    baseURL: config.apiUrl,
    timeout: 15_000,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (req: InternalAxiosRequestConfig) => {
        const token = getAuthToken();
        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }
        return req;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearAuthToken();
        }
        return Promise.reject(error);
    }
);

function getAuthToken(): string | null {
    return localStorage.getItem("token") ?? sessionStorage.getItem("token");
}

function clearAuthToken(): void {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
}

export default apiClient;
