export interface ServiceModel {
  id: number;
  userId: string; // Guid
  user: userModel;
  name: PetSittingServicesEnum;
  price: number;
  maxNumberOfPets?: number; // Optional field
  personalDescription?: string; // Optional field
  typeOfPet: AnimalSpecie;
  listings: ListingModel[];
}