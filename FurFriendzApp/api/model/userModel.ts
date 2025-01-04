import UserRole from "./userRole"
import AddressModel from "./addressModel"

interface UserModel {
  id: string;
  lastName: string;
  firstName: string;
  username: string;
  telephone?: string;
  email?: string;
  role: number;
  roleEnum: UserRole;
  imageID?: Uint8Array;
  homeAddress: AddressModel;
}