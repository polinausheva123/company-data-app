export type SortField = "name" | "revenue" | "foundedYear" | "companyType";

export interface SortOption {
  label: string;
  value: SortField;
}

export interface CompanyFilters {
  industry: string;
  minRevenue: number;
  size: string;
}
