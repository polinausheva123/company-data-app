import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";
import { Company } from "../types/company";
import { formatCurrency } from "../utils/formatCurrency";

interface Props {
  company: Company;
}

export const CompanyCard = ({ company }: Props) => {
  const isPublic = company.details.companyType === "Public";

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{company.name}</Text>
          <Text style={styles.industry}>
            {company.industry}, {company.country}
          </Text>
        </View>
        <View
          style={[
            styles.typeTag,
            { borderColor: isPublic ? COLORS.primary : COLORS.border },
          ]}
        >
          <Text
            style={[
              styles.typeTagText,
              { color: isPublic ? COLORS.primary : COLORS.textSecondary },
            ]}
          >
            {company.details.companyType}
          </Text>
        </View>
      </View>

      <View style={styles.spacer} />

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Revenue</Text>
          <Text style={styles.statValue}>
            {formatCurrency(company.financials.revenue)}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Net Income</Text>
          <Text
            style={[
              styles.statValue,
              {
                color:
                  company.financials.netIncome >= 0
                    ? COLORS.success
                    : COLORS.error,
              },
            ]}
          >
            {company.financials.netIncome >= 0 ? "+" : ""}
            {formatCurrency(company.financials.netIncome)}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Founded</Text>
          <Text style={styles.statValue}>{company.foundedYear}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Revenue</Text>
          <Text style={styles.statValue}>
            {formatCurrency(company.financials.revenue)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>CEO: {company.details.ceoName}</Text>
        <Text style={styles.footerText}>Size: {company.details.size}</Text>
        <Text style={styles.footerText} numberOfLines={1}>
          {company.details.headquarters}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.large,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 17,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
  },
  industry: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  typeTagText: {
    fontSize: 11,
    fontWeight: FONTS.semibold,
  },
  spacer: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 15,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
  },
  footer: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 12,
    flex: 1,
  },
});
