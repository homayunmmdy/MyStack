type BaseType = {
  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type Category = {
  id: number;
  name: string;
};

export type PostsCashType = {
  title: string;
  imgurl: string;
  description: string;
  services: string;
  section: string;
  categories?: Category[];
} & BaseType;