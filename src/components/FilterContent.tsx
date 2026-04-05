import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";
import { INDUSTRIES, COMPANY_SIZES } from "../../constants/companies";
import Slider from "@react-native-community/slider";

interface FilterState {
  industry: string;
  minRevenue: number;
  size: string;
}

interface FilterProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export const FilterContent = ({ filters, setFilters }: FilterProps) => {
  const industryData = Object.values(INDUSTRIES).map((industry) => ({
    label: industry,
    value: industry,
  }));

  const sizeArray = Object.values(COMPANY_SIZES);

  const formatRevenue = (val: number) => {
    if (val >= 1000) return `$1B+`;
    return `$${val}M+`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Industry</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemText}
        data={industryData}
        containerStyle={styles.dropdownContainer}
        labelField="label"
        valueField="value"
        value={filters.industry}
        maxHeight={250}
        onChange={(item) => {
          setFilters({ ...filters, industry: item.value });
        }}
      />

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Min Revenue</Text>
          <Text style={styles.value}>{formatRevenue(filters.minRevenue)}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1000}
          step={50}
          value={filters.minRevenue}
          onValueChange={(val) => setFilters({ ...filters, minRevenue: val })}
          minimumTrackTintColor={COLORS.textPrimary}
          maximumTrackTintColor={COLORS.border}
          thumbTintColor={COLORS.primary}
        />
      </View>

      <Text style={[styles.label, { marginTop: 25 }]}>Company Size</Text>
      <View style={styles.chipRow}>
        {sizeArray.map((s) => (
          <Pressable
            key={s}
            onPress={() => setFilters({ ...filters, size: s })}
            style={({ pressed }) => [
              styles.chip,
              filters.size === s && styles.activeChip,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                filters.size === s && styles.activeChipText,
              ]}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
  },
  container: { paddingVertical: 10 },
  label: {
    fontSize: 12,
    fontWeight: FONTS.semibold,
    color: COLORS.textSecondary,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  dropdown: {
    backgroundColor: COLORS.border,
    height: 50,
    borderRadius: RADIUS.large,
    borderColor: COLORS.border,
    borderWidth: 2,
    paddingHorizontal: 12,
  },
  dropdownContainer: {
    marginTop: -20,
  },
  placeholderStyle: { fontSize: 16, color: COLORS.textSecondary },
  selectedTextStyle: {
    fontSize: 16,
    fontWeight: FONTS.semibold,
    color: COLORS.textPrimary,
  },

  itemText: { fontSize: 15, color: COLORS.textPrimary },
  section: { marginTop: 28 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8
  },
  value: { color: COLORS.primary, fontWeight: FONTS.semibold, fontSize: 15 },
  slider: { width: "100%", height: 40 },

  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  chip: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.large,
    minWidth: 80,
    alignItems: "center",
    marginRight: 10,
  },
  chipText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: FONTS.regular,
  },
  activeChip: { backgroundColor: COLORS.primary },
  activeChipText: { fontWeight: FONTS.semibold },
});
