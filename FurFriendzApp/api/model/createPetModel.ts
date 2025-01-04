interface CreatePetModel {
    name: string;
    type: string;
    breed?: string;
    age?: number;
    ownerId: string;
    imageID?: Uint8Array;
  }
  