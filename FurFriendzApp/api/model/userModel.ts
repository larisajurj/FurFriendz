interface UserModel {
  id: string;
  lastName: string;
  firstName: string;
  username: string;
  telephone?: string;
  email?: string;
  role: UserRole;
  imageID?: Uint8Array;
}