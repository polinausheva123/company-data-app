import {
  COMPANY_SIZES,
  INDUSTRIES,
  COMPANY_TYPES,
  COUNTRIES,
} from "../../constants/companies";

export type CompanySize = (typeof COMPANY_SIZES)[keyof typeof COMPANY_SIZES];
export type CompanyType = (typeof COMPANY_TYPES)[keyof typeof COMPANY_TYPES];
export type Industry = (typeof INDUSTRIES)[keyof typeof INDUSTRIES];
export type Country = (typeof COUNTRIES)[keyof typeof COUNTRIES];

export interface FinancialData {
  year: number;
  revenue: number;
  netIncome: number;
}

export interface CompanyDetails {
  headquarters: string;
  companyType: CompanyType;
  size: CompanySize;
  ceoName: string;
}

export interface Company {
  name: string;
  country: Country;
  foundedYear: number;
  industry: Industry;
  financials: FinancialData;
  details: CompanyDetails;
}
