type AdminUser = {
    id: string;
  collectionId: string;
  collectionName: string;
  created: string; 
  updated: string; 
  email: string; 
  emailVisibility: boolean;
  verified: boolean;
  name?: string;
  password: string
}

      export const adminUser: AdminUser = {
      id: '22v1q02cw5g9096',
      collectionId: 'pbc_3995838106',
      collectionName: 'expressUsers',
      created: '2025-06-15T19:54:38.904Z',
      updated: '2025-06-15T19:54:38.904Z',
      email: 'admin@expressship.com',
      emailVisibility: true,
      verified: true,
      name: 'Admin User',
      password: "admin123"
    };