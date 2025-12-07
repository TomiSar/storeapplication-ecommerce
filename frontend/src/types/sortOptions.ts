export type SortOption =
  | 'Name Ascending'
  | 'Name Descending'
  | 'Price Low to High'
  | 'Price High to Low'
  | 'Popularity';

export const SortOptions: SortOption[] = [
  'Name Ascending',
  'Name Descending',
  'Price Low to High',
  'Price High to Low',
  'Popularity',
];
