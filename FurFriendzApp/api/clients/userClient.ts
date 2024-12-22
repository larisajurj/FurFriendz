import { BaseClient } from "../base/baseClient";
import { CreateUserModel } from "../model/createUserModel"
import { UserModel } from "../model/userModel"

export const UserClient = {
    urlPath:"Users",

    // Get all users
        async getAllAsync(): Promise<UserModel[]> {
            return BaseClient.get<UserModel[]>(`${this.urlPath}`).then(response => response.data);
        },

        // Get a user by ID
        async getOneAsync(id: string): Promise<UserModel> {
            return BaseClient.get<UserModel>(`${this.urlPath}/${id}`).then(response => response.data);
        },

        // Create a new user
        async createPetSitterAsync(newUser: createUserModel): Promise<createUserModel> {
            return BaseClient.post<UserModel>(`${this.urlPath}/CreatePetSitter`, newUser).then(response => response.data);
        },

        // Update an existing user
        async updateAsync(id: string, updatedUser: UserModel): Promise<UserModel> {
            return BaseClient.put<UserModel>(`${this.urlPath}/${id}`, updatedUser).then(response => response.data);
        },

        // Delete a user by ID
        async deleteAsync(id: string): Promise<void> {
            return BaseClient.delete(`${this.urlPath}/${id}`).then(response => {});
        },
}