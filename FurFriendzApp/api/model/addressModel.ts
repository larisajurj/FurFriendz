export interface AddressMode {
  streetName: string;        // The name of the street
  buildingNumber: string;    // The building number
  apartmentNumber?: string;  // Optional: Apartment number
  city: string;              // The name of the city
  latitude?: number;         // Optional: Latitude coordinate
  longitude?: number;        // Optional: Longitude coordinate
}