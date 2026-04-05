import { DEFAULT_FILTER, SortOrder } from "../../constants/sort";
import { CompanyFilters } from "../types/sort";
import { Company } from "../types/company";

export const searchCompanies = (
  companies: Company[],
  searchText: string,
): Company[] => {
  const query = searchText.toLowerCase().trim();
  if (!query) return companies;

  const results: Company[] = [];

  const isGreater = query.startsWith(">");
  const isLess = query.startsWith("<");
  const numericQuery =
    isGreater || isLess ? parseFloat(query.substring(1).trim()) : NaN;

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    let isMatch = false;

    const searchableText =
      `${company.name} ${company.industry} ${company.country} ${company.details.ceoName}`.toLowerCase();

    if (searchableText.includes(query)) {
      isMatch = true;
    }

    if (!isMatch && !isNaN(numericQuery)) {
      const numericFields = [
        company.foundedYear,
        company.financials.revenue,
        company.financials.netIncome,
      ];

      for (let j = 0; j < numericFields.length; j++) {
        const number = numericFields[j];
        if (
          (isGreater && number > numericQuery) ||
          (isLess && number < numericQuery)
        ) {
          isMatch = true;
          break;
        }
      }
    }

    if (isMatch) {
      results.push(company);
    }
  }

  return results;
};

export const sortCompanies = (
  companies: Company[],
  field: string,
  order: SortOrder.ASC | SortOrder.DESC,
): Company[] => {
  const sortedCompanies = [...companies];

  const getFieldValue = (company: Company): string | number => {
    switch (field) {
      case "revenue":
        return company.financials.revenue;
      case "netIncome":
        return company.financials.netIncome;
      case "foundedYear":
        return company.foundedYear;
      case "companyType":
        return company.details.companyType;
      case "ceoName":
        return company.details.ceoName;
      default:
        return (company as any)[field] ?? "";
    }
  };

  return sortedCompanies.sort((a, b) => {
    const aText = getFieldValue(a);
    const bText = getFieldValue(b);

    if (typeof aText === "number" && typeof bText === "number") {
      return order === SortOrder.ASC ? aText - bText : bText - aText;
    }

    const firstText = String(aText).toLowerCase();
    const secondText = String(bText).toLowerCase();

    if (firstText === secondText) return 0;

    const comparison = firstText > secondText ? 1 : -1;
    return order === SortOrder.ASC ? comparison : -comparison;
  });
};

export const filterCompanies = (
  companies: Company[],
  filters: CompanyFilters,
) => {
  return companies.filter((company) => {
    if (
      filters.industry !== DEFAULT_FILTER &&
      company.industry !== filters.industry
    ) {
      return false;
    }

    if (
      filters.size !== DEFAULT_FILTER &&
      company.details.size !== filters.size
    ) {
      return false;
    }

    return company.financials.revenue >= filters.minRevenue;
  });
};
