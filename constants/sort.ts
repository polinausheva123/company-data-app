import { CompanyFilters, SortOption } from "../src/types/sort";

export const DEFAULT_FILTER = "All";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export const SORT_OPTIONS: SortOption[] = [
  { label: "Name", value: "name" },
  { label: "Revenue", value: "revenue" },
  { label: "Founded Year", value: "foundedYear" },
  { label: "Company Type", value: "companyType" },
];

export const INITIAL_FILTERS: CompanyFilters = {
  industry: DEFAULT_FILTER,
  minRevenue: 0,
  size: DEFAULT_FILTER,
};
