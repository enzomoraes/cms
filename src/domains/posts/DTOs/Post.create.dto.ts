export interface PostCreate {
  id: number;
  title: string;
  slug: string;
  tags: string[];
  body: string;
  imagesIds: string[];
  createdAt: string;
}
