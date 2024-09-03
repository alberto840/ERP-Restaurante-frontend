export interface UserInterfaceData {
  id: number;
  name: string;
  phone: number | string;
  birthday: string;
  email: string;
  role: string;
  status: string;
  address: string;
  action: any;
  gender: string;
  price: number;
}
export const userData: UserInterfaceData[] = [
  {
    id: 1,
    name: 'Joseph Tylor',
    phone: `75869412`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Joseph@example.com',
    role: 'Owner',
    status: 'Online',
    address: '2851 Green Avenue, Oakland, CA 94612',
    action: 'action',
    price: 5000,
  },
  {
    id: 2,
    name: 'Paul Freeman',
    phone: `78596214`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Emily@example.com',
    role: 'Admin',
    status: 'Offline',
    address: '123 Main Street, Anytown, NY 12345',
    action: 'action',
    price: 8000,
  },
  {
    id: 3,
    name: 'Matthew Smallwood',
    phone: `74521638`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Michael@example.com',
    role: 'Admin',
    status: 'Online',
    address: '456 Elm Street, Springfield, IL 67890',
    action: 'action',
    price: 8000,
  },
  {
    id: 4,
    name: 'Danyelle Lundy',
    phone: `75896321`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Sophia@example.com',
    role: 'Biller',
    status: 'Offline',
    address: '789 Oak Street, Pleasantville, TX 54321',
    action: 'action',
    price: 8000,
  },
  {
    id: 5,
    name: 'Glenn Weiner',
    phone: `78569541`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Alexander@example.com',
    role: 'Biller',
    status: 'Online',
    address: '987 Pine Street, Lakeside, FL 98765',
    action: 'action',
    price: 8000,
  },
  {
    id: 6,
    name: 'Alexander Crow',
    phone: `79683524`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Emma@example.com',
    role: 'Biller',
    status: 'Online',
    address: '654 Maple Street, Riverside, WA 23456',
    action: 'action',
    price: 8000,
  },
  {
    id: 7,
    name: 'Rosemary Clark',
    phone: `75142368`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Daniel@example.com',
    role: 'Supervisor',
    status: 'Offline',
    address: '321 Cedar Street, Mountainview, CA 65432',
    action: 'action',
    price: 8000,
  },
  {
    id: 8,
    name: 'Jennifer Carver',
    phone: `71425352`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Olivia@example.com',
    role: 'Manager',
    status: 'Online',
    address: '741 Birch Street, Oceanview, OR 87654',
    action: 'action',
    price: 8000,
  },
  {
    id: 9,
    name: 'Donald Boser',
    phone: `75211425`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'William@example.com',
    role: 'Admin',
    status: 'Offline',
    address: '852 Walnut Street, Hillside, NV 34567',
    action: 'action',
    price: 8000,
  },
  {
    id: 10,
    name: 'Maria Cavallo',
    phone: `76353235`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Ava@example.com',
    role: 'Super Admin',
    status: 'Online',
    address: '369 Cherry Street, Sunnyside, AZ 01234',
    action: 'action',
    price: 8000,
  },
  {
    id: 11,
    name: 'Glenn Maxwel',
    phone: `722142536`,
    birthday: '1990-01-01',
    gender: 'Male',
    email: 'Maxwel@example.com',
    role: 'Biller',
    status: 'Online',
    address: '987 Pine Street, Lakeside, FL 98765',
    action: 'action',
    price: 8000,
  },
];
