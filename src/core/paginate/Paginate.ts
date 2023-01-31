export default class Paginated<T> {
  content: T[];
  rows: number;
  page: number;
  totalRecords: number;
}

export interface PaginateQuery {
  rows: number;
  page: number;
  order: string;
}
