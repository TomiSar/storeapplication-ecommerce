export interface Profile {
  name: string;
  email: string;
  mobileNumber: string;
  address: Address;
  emailUpdated: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
