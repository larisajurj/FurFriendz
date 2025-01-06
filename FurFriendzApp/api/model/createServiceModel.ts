export interface CreateServiceModel {
  userId: string; // Guid
  name: PetSittingServicesEnum;
  price: number;
  maxNumberOfPets?: number; // Optional field
  personalDescription?: string; // Optional field
  typeOfPet: AnimalSpecie;
}