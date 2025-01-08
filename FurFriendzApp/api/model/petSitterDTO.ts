import AddressModel from './addressModel'
import ServiceDTO from './serviceDTO'

export interface PetSitterDTO {
    id: string; // Guid is equivalent to string in TypeScript
    lastName: string;
    firstName: string;
    username: string;
    telephone?: string; // Optional field
    email?: string; // Optional field
    imageId?: Uint8Array; // byte[] in C# is Uint8Array in TypeScript
    homeAddress?: AddressModel; // Optional field
    services: ServiceDTO[]; // List<ServiceDTO> is ServiceDTO[]
}