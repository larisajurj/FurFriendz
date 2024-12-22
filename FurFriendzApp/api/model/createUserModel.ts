interface CreateUserModel {
  lastName: string;
  firstName: string;
  username: string;
  telephone?: string;
  email?: string;
  role: string;
  imageID?: Uint8Array;
}