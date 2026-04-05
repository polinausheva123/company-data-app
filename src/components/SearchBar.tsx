import React from "react";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const isTooShort = value.length > 0 && value.length < 3;

  return (
    <View style={styles.headerSection}>
      <Text style={styles.title} accessibilityRole="header">
        Search Company
      </Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={value}
        onChangeText={onChange}
        placeholderTextColor={COLORS.textSecondary}
      />

      <View style={styles.messageContainer}>
        <Text style={[styles.subTitle, isTooShort && styles.hintText]}>
          {isTooShort
            ? "Please enter minimum 3 characters"
            : "Find by name, CEO or revenue"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerSection: {
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: FONTS.bold,
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  searchBar: {
    height: 50,
    paddingHorizontal: 18,
    fontSize: 16,
    borderColor: COLORS.border,
    borderWidth: 2,
    borderRadius: RADIUS.large,
  },
  messageContainer: {
    marginTop: 8,
    justifyContent: "center",
  },
  subTitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  hintText: {
    fontSize: 13,
    fontWeight: FONTS.semibold,
  },
});
