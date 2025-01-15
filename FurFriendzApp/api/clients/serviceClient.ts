import { BaseClient } from "../base/baseClient";
import { CreateListingModel } from '../model/CreateListingModel';
import { ListingModel } from '../model/ListingModel';
import { ServiceModel } from '../model/ServiceModel';
import { RequestStatus } from '../model/RequestStatus';
import { CreateServiceModel } from '../model/CreateServiceModel';

export const ServiceClient = {
  urlPath: "PetSittingService",

  // Get service by serviceId
  async getServiceByIdAsync(id: number): Promise<ServiceModel> {
    return BaseClient.get<ServiceModel>(`${this.urlPath}/${id}`).then(response => response.data);
  },

  // Add a new service
  async addServiceAsync(service: CreateServiceModel): Promise<ServiceModel> {
    return BaseClient.post<CreateServiceModel, ServiceModel>(`${this.urlPath}`, service).then(response => response.data);
  },

  // Update a service by ID
  async updateServiceAsync(id: number, service: ServiceModel): Promise<void> {
    return BaseClient.put<ServiceModel>(`${this.urlPath}/${id}`, service).then(response => response.data);
  },

  // Delete a service by ID
  async deleteServiceAsync(id: number): Promise<void> {
    return BaseClient.delete<void>(`${this.urlPath}/${id}`).then(response => response.data);
  },

  // Get all services of a user
  async getServicesByUserIdAsync(userId: string): Promise<ServiceModel[]> {
    return BaseClient.get<ServiceModel[]>(`${this.urlPath}/user/${userId}`).then(response => response.data);
  },

  // Create a new pet sitting request
  async createRequestAsync(listing: CreateListingModel): Promise<number> {
    return await BaseClient.post<number>(`${this.urlPath}/request`, listing).then(response => {});
  },

  // Change status of a request
  async changeRequestStatusAsync(id: number, newStatus: RequestStatus): Promise<void> {
    return BaseClient.patch<void>(`${this.urlPath}/request/${id}/status/${newStatus}`).then(response => response.data);
  },

  // Get all listings of a requesting user
  async getRequestsFromUserAsync(userId: string): Promise<ListingModel[]> {
    console.log(userId);
    return BaseClient.get<ListingModel[]>(`${this.urlPath}/request/user/${userId}`).then(response => response.data);
  },

  // Get all listings of a pet sitter user
  async getRequestsForPetSitterAsync(petSitterId: string): Promise<ListingModel[]> {
    return BaseClient.get<ListingModel[]>(`${this.urlPath}/request/petSitter/${petSitterId}`).then(response => response.data);
  },

  // Delete a request by ID
  async deleteRequestAsync(requestId: number): Promise<void> {
    return BaseClient.delete<void>(`${this.urlPath}/request/${requestId}`).then(response => response.data);
  }
};
