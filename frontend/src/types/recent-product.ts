export interface RecentProduct {
  id: number;
  modelName: string;
  createdAt: string;

  company: {
    name: string;
  };

  category: {
    name: string;
  };

  gender: {
    name: string;
  };
}
