import { BaseApiClients } from "../base/baseClient";
import { UserModel } from "../model/userModel"

export const UserClient = {
    urlPath:"Users",

    // Get all users
        async getAllAsync(): Promise<UserModel[]> {
            return axiosInstance.get<UserModel[]>(`${this.urlPath}`).then(response => response.data);
        },

        // Get a user by ID
        async getOneAsync(id: string): Promise<UserModel> {
            return axiosInstance.get<UserModel>(`${this.urlPath}/${id}`).then(response => response.data);
        },

        // Create a new user
        async createAsync(newUser: UserModel): Promise<UserModel> {
            return axiosInstance.post<UserModel>(`${this.urlPath}`, newUser).then(response => response.data);
        },

        // Update an existing user
        async updateAsync(id: string, updatedUser: UserModel): Promise<UserModel> {
            return axiosInstance.put<UserModel>(`${this.urlPath}/${id}`, updatedUser).then(response => response.data);
        },

        // Delete a user by ID
        async deleteAsync(id: string): Promise<void> {
            return axiosInstance.delete(`${this.urlPath}/${id}`).then(response => {});
        },
}