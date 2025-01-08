import { BaseClient } from './BaseClient';
import { CreateServiceModel, ServiceModel, CreateListingModel, RequestStatus, ListingModel } from './models';

export const ServiceClient = {
  urlPath: "PetSitterServices",

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
  async createRequestAsync(listing: CreateListingModel): Promise<ListingModel> {
    return BaseClient.post<CreateListingModel, ListingModel>(`${this.urlPath}/request`, listing).then(response => response.data);
  },

  // Change status of a request
  async changeRequestStatusAsync(id: number, newStatus: RequestStatus): Promise<void> {
    return BaseClient.patch<void>(`${this.urlPath}/request/${id}/status/${newStatus}`).then(response => response.data);
  },

  // Get all listings of a requesting user
  async getRequestsFromUserAsync(userId: string): Promise<ListingModel[]> {
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
