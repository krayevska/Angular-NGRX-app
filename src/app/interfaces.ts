export interface User {
  first_name: string;
  last_name: string;
  role: string;
  token: string;
}

export interface Assessment {
  id: number;
  name: string;
  users_resolved: number;
  active: boolean;
  image_url: string;
}

export interface Report {
  data: {
    Agreeableness: number;
    Drive: number;
    Luck: number;
    Openess: number;
  };
  type: string;
}
