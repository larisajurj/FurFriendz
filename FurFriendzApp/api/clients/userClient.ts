import { BaseClient } from "../base/baseClient";
import { CreateUserModel } from "../model/createUserModel"
import { UserModel } from "../model/userModel"
import { UserRole } from "../model/userRole"

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
        // Get a user by email
        async getByEmailAsync(email: string): Promise<UserModel> {
            const user =  await BaseClient.get<UserModel>(`${this.urlPath}/Byemail/${email}`).then(response => response.data);
            //console.log(user);
            if(user.role == 0){
                user.roleEnum = UserRole.Admin;
            }
            else if (user.role == 1){
                user.roleEnum = UserRole.PetSitter;
            }
            else{
                user.roleEnum = UserRole.PetOwner;
            }
            return user;
        },

        // Create a new user
        async createPetSitterAsync(newUser: createUserModel): Promise<createUserModel> {
            return BaseClient.post<UserModel>(`${this.urlPath}/CreatePetSitter`, newUser).then(response => response.data);
        },
        async createPetOwnerAsync(newUser: createUserModel): Promise<createUserModel> {
            return BaseClient.post<UserModel>(`${this.urlPath}/CreatePetOwner`, newUser).then(response => response.data);
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