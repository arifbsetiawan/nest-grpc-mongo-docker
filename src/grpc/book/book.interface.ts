export interface IAuthor {
  name: string;
  phone: string;
  address: string;
}

export interface IBook {
  id?: string;
  title: string;
  year: number;
  author: IAuthor;
}