interface PetModel {
  id: number;
  name: string;
  gender: number; // 0 for male, 1 for female
  specieId: number; // Matches specieId from the API
  breedId: number; // Matches breedId from the API
  profileImage: string; // Base64 string for the image
  weight: number; // Weight in kilograms
  birthday: string; // ISO 8601 date string
  ownerId: string; // UUID of the owner
}
  