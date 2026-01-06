import { useMemo, useState } from 'react';
import { SortOptions, type Product, type SortOption } from '../types';
import Dropdown from './Dropdown';
import ProductCard from './ProductCard';
import SearchBox from './SearchBox';

interface ProductListingsProps {
  products: Product[];
}

export default function ProductListings({ products }: ProductListingsProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [SelectedSort, setSelectedSort] = useState<SortOption>('Popularity');

  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    const q = searchText.trim().toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        !q ||
        (product.name ?? '').toString().toLowerCase().includes(q) ||
        (product.description ?? '').toString().toLowerCase().includes(q),
    );

    return filteredProducts.slice().sort((a, b) => {
      switch (SelectedSort) {
        case 'Name Ascending':
          return a.name.localeCompare(b.name, undefined, {
            sensitivity: 'base',
          });
        case 'Name Descending':
          return b.name.localeCompare(a.name, undefined, {
            sensitivity: 'base',
          });
        case 'Price Low to High':
          return a.price - b.price;
        case 'Price High to Low':
          return b.price - a.price;
        case 'Popularity':
        default:
          return (
            parseInt((b.popularity ?? '0').toString()) - parseInt((a.popularity ?? '0').toString())
          );
      }
    });
  }, [products, searchText, SelectedSort]);

  function handleSearchChange(inputSearch: string) {
    setSearchText(inputSearch);
  }

  function handleSortChange(sortOption: SortOption) {
    setSelectedSort(sortOption);
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <SearchBox
          label="Search"
          placeholder="Search Products"
          value={searchText}
          handleSearch={(value) => handleSearchChange(value)}
        />

        <Dropdown
          label="Sort By"
          options={SortOptions}
          selectedValue={SelectedSort}
          handleSort={(value) => handleSortChange(value as SortOption)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-lg text-primary dark:text-light">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}
