import { DEFAULT_FILTER, SortOrder } from "../../constants/sort";
import { CompanyFilters } from "../types/sort";
import { Company } from "../types/company";

export const searchCompanies = (
  companies: Company[],
  searchText: string,
): Company[] => {
  const query = searchText.toLowerCase().trim();
  if (query.length < 3) return companies;

  const results: Company[] = [];

  const regMatch = query.match(
    /(founded_year|revenue|net_income)\s*([<>])\s*(\d+)/i,
  );

  for (let i = 0; i < companies.length; i++) {
    const company = companies[i];
    let isMatch = false;

    if (regMatch) {
      const field = regMatch[1];
      const operator = regMatch[2];
      const targetNum = parseFloat(regMatch[3]);

      let value = 0;

      if (field === "founded_year") value = company.foundedYear;
      if (field === "revenue") value = company.financials.revenue;
      if (field === "net_income") value = company.financials.netIncome;

      if (operator === ">") {
        isMatch = value > targetNum;
      } else if (operator === "<") {
        isMatch = value < targetNum;
      }
    }

    if (!isMatch) {
      const searchableValues = [
        company.name,
        company.industry,
        company.country,
        company.details.ceoName,
        company.details.headquarters,
        String(company.foundedYear),
      ];

      for (let j = 0; j < searchableValues.length; j++) {
        const fieldValue = String(searchableValues[j]).toLowerCase();

        if (fieldValue.indexOf(query) !== -1) {
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
