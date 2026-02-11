import { apiClient } from "@/shared/lib";
import type { User, UserDto } from "../model/types";

function mapDtoToUser(dto: UserDto): User {
    return {
        id: dto.id,
        email: dto.email,
        name: dto.name,
        avatarUrl: dto.avatar_url,
    };
}

export async function fetchUserById(id: string): Promise<User> {
    const { data } = await apiClient.get<UserDto>(`/users/${id}`);
    return mapDtoToUser(data);
}
