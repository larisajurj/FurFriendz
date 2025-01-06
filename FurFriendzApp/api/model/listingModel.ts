export interface ListingModel {
  id: number;
  requestingUserId: string; // Guid
  pets: petModel[];
  startDate: string; // DateOnly -> ISO string
  endDate: string;
  details?: string; // Optional field
  serviceId: number;
}