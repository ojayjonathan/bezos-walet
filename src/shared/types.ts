export type Transaction = {
  id: number;
  merchantName: string;
  date: Date;
  amount: number;
};

export type Tag = {
  name: string;
  id: number;
};
export type Merchant = {
  name: string;
  tagId?: number | null;
};
