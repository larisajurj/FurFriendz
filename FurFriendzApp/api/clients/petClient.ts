import { BaseClient } from "../base/baseClient";
import { PetModel } from "../model/petModel";
import { CreatePetModel } from "../model/createPetModel"

export const PetClient = {
    urlPath: "Pets",

    // Get a pet by ID
    async getOneAsync(id: number): Promise<PetModel> {
        return BaseClient.get<PetModel>(`${this.urlPath}/${id}`).then(response => response.data);
    },

    // Get pets by User ID
    async getByUserIdAsync(userId: string): Promise<PetModel[]> {
        return BaseClient.get<PetModel[]>(`${this.urlPath}/user/${userId}`).then(response => response.data);
    },

    // Create a new pet
    async createAsync(newPet: CreatePetModel): Promise<PetModel> {
        return BaseClient.post<PetModel>(`${this.urlPath}`, newPet).then(response => response.data);
    },

    // Update an existing pet
    async updateAsync(id: number, updatedPet: PetModel): Promise<PetModel> {
        return BaseClient.put<PetModel>(`${this.urlPath}/${id}`, updatedPet).then(response => response.data);
    },

    // Delete a pet by ID
    async deleteAsync(id: number): Promise<void> {
        return BaseClient.delete(`${this.urlPath}/${id}`).then(response => {});
    },

}