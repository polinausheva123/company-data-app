import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SORT_OPTIONS, SortOrder } from "../../constants/sort";
import { COLORS, FONTS } from "../../constants/theme";
import { Dropdown } from "react-native-element-dropdown";

interface Props {
  currentField: string;
  currentOrder: SortOrder;
  onSortChange: (field: string, order: SortOrder) => void;
}

export const SortDropdown = ({
  currentField,
  currentOrder,
  onSortChange,
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Sort by:</Text>

      <Dropdown
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemText}
        data={SORT_OPTIONS}
        labelField="label"
        valueField="value"
        value={currentField}
        onChange={(item) => {
          onSortChange(item.value, currentOrder);
        }}
      />

      <Pressable
        hitSlop={10}
        style={({ pressed }) => [
          styles.directionBtn,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={() =>
          onSortChange(
            currentField,
            currentOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC,
          )
        }
      >
        <Text style={styles.directionText}>
          {currentOrder === SortOrder.ASC ? "Low ↑" : "High ↓"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  dropdown: {
    flex: 1,
    height: 40,
    marginLeft: 8,
  },
  selectedTextStyle: {
    fontSize: 15,
    fontWeight: FONTS.semibold,
    color: COLORS.primary,
  },
  itemText: {
    fontSize: 14,
    color: COLORS.textPrimary,
  },
  directionBtn: {
    padding: 8,
  },
  directionText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: FONTS.bold,
  },
});
