import {RequestStatus} from './requestStatus'
export interface ListingModel {
  id: number;
  requestingUserId: string;
  pets: petModel[];
  startDate: string;
  endDate: string;
  details?: string;
  serviceId: number;
  status: string;
}