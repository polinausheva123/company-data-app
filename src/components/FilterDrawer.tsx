import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { FilterContent } from "./FilterContent";
import { INITIAL_FILTERS } from "../../constants/sort";
import { COLORS, FONTS, RADIUS } from "../../constants/theme";

interface FilterState {
  industry: string;
  minRevenue: number;
  size: string;
}

interface FilterDrawerProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export const FilterDrawer = ({
  visible,
  onClose,
  filters,
  setFilters,
}: FilterDrawerProps) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    if (visible) setLocalFilters(filters);
  }, [visible, filters]);

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.dismissArea} onPress={onClose} />
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>

            <Pressable
              onPress={() => setLocalFilters(INITIAL_FILTERS)}
              hitSlop={10}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text style={styles.resetText}>Reset</Text>
            </Pressable>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollArea}
          >
            <FilterContent
              filters={localFilters}
              setFilters={setLocalFilters}
            />
          </ScrollView>

          <View style={styles.footer}>
            <Pressable
              style={({ pressed }) => [
                styles.closeBtn,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={onClose}
            >
              <Text style={styles.closeBtnText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.applyBtn,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={handleApply}
            >
              <Text style={styles.applyBtnText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  dismissArea: {
    flex: 1,
  },
  drawer: {
    backgroundColor: COLORS.textPrimary,
    borderTopLeftRadius: RADIUS.large,
    borderTopRightRadius: RADIUS.large,
    height: "80%",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  title: { fontSize: 24, fontWeight: FONTS.bold, color: COLORS.textPrimary },
  resetText: { color: COLORS.error, fontWeight: FONTS.semibold },
  scrollArea: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  closeBtn: {
    flex: 1,
    padding: 18,
    borderRadius: RADIUS.large,
    alignItems: "center",
    borderColor: COLORS.border,
    borderWidth: 2,
  },
  closeBtnText: { color: COLORS.textPrimary, fontWeight: FONTS.semibold },
  applyBtn: {
    flex: 2,
    padding: 18,
    borderRadius: RADIUS.large,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  applyBtnText: { fontWeight: FONTS.semibold },
});
