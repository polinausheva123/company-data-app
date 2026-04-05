import { Company } from "../types/company";
import {
  INDUSTRIES,
  COMPANY_SIZES,
  COMPANY_TYPES,
  COUNTRIES,
} from "../../constants/companies";

export const companies: Company[] = [
  {
    name: "Amazon",
    country: COUNTRIES.USA,
    industry: INDUSTRIES.ECOMMERCE,
    foundedYear: 1994,
    financials: {
      year: 2023,
      revenue: 950000000,
      netIncome: 77000000,
    },
    details: {
      companyType: COMPANY_TYPES.PUBLIC,
      size: COMPANY_SIZES.LARGE,
      ceoName: "Jeff Bezos",
      headquarters: "Seattle, WA",
    },
  },
  {
    name: "Florida Robotics Inc.",
    country: COUNTRIES.USA,
    industry: INDUSTRIES.ROBOTICS,
    foundedYear: 1940,
    financials: {
      year: 2026,
      revenue: 910000000,
      netIncome: 80000000,
    },
    details: {
      companyType: COMPANY_TYPES.PRIVATE,
      size: COMPANY_SIZES.MEDIUM,
      ceoName: "Cave Johnson",
      headquarters: "Upper Michigan",
    },
  },
  {
    name: "Robotics Company Tokyo",
    country: COUNTRIES.JAPAN,
    industry: INDUSTRIES.ROBOTICS,
    foundedYear: 2004,
    financials: {
      year: 2023,
      revenue: 450000000,
      netIncome: 5000000,
    },
    details: {
      companyType: COMPANY_TYPES.PRIVATE,
      size: COMPANY_SIZES.SMALL,
      ceoName: "Yoshiyuki Sankai",
      headquarters: "Tsukuba",
    },
  },
  {
    name: "USA Company Defense",
    country: COUNTRIES.USA,
    industry: INDUSTRIES.DEFENSE,
    foundedYear: 1940,
    financials: {
      year: 2023,
      revenue: 51000000,
      netIncome: 5000000,
    },
    details: {
      companyType: COMPANY_TYPES.PUBLIC,
      size: COMPANY_SIZES.LARGE,
      ceoName: "Pepper Potts",
      headquarters: "Los Angeles, CA",
    },
  },
  {
    name: "GreenWheel",
    country: COUNTRIES.GERMANY,
    industry: INDUSTRIES.AUTOMOTIVE,
    foundedYear: 2018,
    financials: {
      year: 2023,
      revenue: 15000000,
      netIncome: 200000,
    },
    details: {
      companyType: COMPANY_TYPES.PRIVATE,
      size: COMPANY_SIZES.MEDIUM,
      ceoName: "Klaus Schmidt",
      headquarters: "Munich",
    },
  },
  {
    name: "FinTech Flow",
    country: COUNTRIES.UK,
    industry: INDUSTRIES.FINANCE,
    foundedYear: 2011,
    financials: {
      year: 2023,
      revenue: 11000000,
      netIncome: 200000,
    },
    details: {
      companyType: COMPANY_TYPES.PUBLIC,
      size: COMPANY_SIZES.MEDIUM,
      ceoName: "Sarah Sterling",
      headquarters: "London",
    },
  },
];
