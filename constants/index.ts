export type USER = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export interface USER_DETAILS extends USER {
  address: {
    street: string;
    suite: string;
    city: string;
  };
  phone: string;
  website: string;
}
