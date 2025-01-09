import { BaseClient } from "../base/baseClient";
import { BreedModel } from "../model/breedModel";

export const BreedClient = {
    urlPath: "Breed",

    // Get breeds by species (0 for cats, 1 for dogs)
    async getBySpeciesAsync(species: number): Promise<BreedModel[]> {
        return BaseClient.get<BreedModel[]>(`${this.urlPath}/species/${species}`).then(response => response.data);
    },
};
