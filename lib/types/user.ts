// Types for the dummyjson.com/users API response

export interface UserApiResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: 'male' | 'female' | string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  department?: string; // Not included in original API but needed for our grouping
}

export interface Hair {
  color: string;
  type: string;
}

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  address: CompanyAddress;
  department: string; // This is the department field we'll use for grouping
  name: string;
  title: string;
}

export interface CompanyAddress {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

// Types for our summary response
export interface SummaryResult {
  [department: string]: DepartmentSummary;
}

export interface DepartmentSummary {
  male: number;
  female: number;
  ageRange: string;
  hair: {
    [color: string]: number;
  };
  addressUser: {
    [nameKey: string]: string;
  };
} 