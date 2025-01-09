export interface CreateListingModel {
  requestingUserId: string;
  pets: number[];
  startDate: string;
  endDate: string;
  details?: string;
  serviceId: number;
}