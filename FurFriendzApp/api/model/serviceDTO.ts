import AnimalSpecie from './animalSpecie'
export interface ServiceDTO {
    id: number;
    userId: string; // Guid is equivalent to string
    name: PetSittingServicesEnum;
    price: number;
    maxNumberOfPets?: number; // Optional field
    personalDescription?: string; // Optional field
    typeOfPet: AnimalSpecie;
}