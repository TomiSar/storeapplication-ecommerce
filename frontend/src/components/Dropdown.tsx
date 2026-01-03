import type { SortOption } from '../types';

interface DropdownProps {
  label: string;
  options: SortOption[];
  selectedValue: SortOption;
  handleSort: (value: SortOption) => void;
}

export default function Dropdown({ label, options, selectedValue, handleSort }: DropdownProps) {
  return (
    <div className="flex items-center gap-2 justify-end pr-12 flex-1 font-primary">
      <label className="text-lg font-semibold text-primary dark:text-light">{label}</label>
      <select
        className="px-3 py-2 text-base border rounded-md transition border-primary dark:border-light focus:ring focus:ring-dark focus:outline-none text-gray-800 dark:text-light bg-white dark:bg-gray-800"
        id="sortProducts"
        name="sortProducts"
        type="text"
        value={selectedValue}
        onChange={(event) => handleSort(event.target.value as SortOption)}
      >
        {options.map((optionValue, index) => (
          <option key={index} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
    </div>
  );
}
