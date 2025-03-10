//src/modules/users/users.service.ts
"use client";

// src/modules/users/schema.ts
import {CreateUserDto, UpdateUserDto, UserDto} from "./users.schema";
import {ServerError, SuccessResponse} from "@lib/util";

// Helper responses (unchanged)
export class UsersService {
    private endpoint = `/api/users`;

    /**
     * Handle JSON parsing & error standardization.
     */
    private async handleResponse<T>(response: Response): Promise<SuccessResponse<T>> {
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            const errorData = data as ServerError;
            throw new ServerError(
                response.status,
                errorData.message,
                false,
                errorData.validationErrors
            );
        }
    }

    public async createUser(user: CreateUserDto): Promise<SuccessResponse<UserDto>> {
        const response = await fetch(this.endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        return this.handleResponse<UserDto>(response);
    }

    public async updateUser(id: number, user: UpdateUserDto): Promise<SuccessResponse<UserDto>> {
        const response = await fetch(`${this.endpoint}?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        return this.handleResponse<UserDto>(response);
    }

    public async deleteUser(id: number): Promise<SuccessResponse<{ id: number }>> {
        const response = await fetch(`${this.endpoint}?id=${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        return this.handleResponse<{ id: number }>(response);
    }

    public async getUsers(): Promise<SuccessResponse<UserDto[]>> {
        const response = await fetch(this.endpoint);
        return this.handleResponse<UserDto[]>(response);
    }
}
