import React, { useState, useMemo, useEffect } from "react";
import { FlatList, View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import {
  filterCompanies,
  searchCompanies,
  sortCompanies,
} from "./utils/companyUtils";
import { companies } from "./data/companies";

import { SearchBar } from "./components/SearchBar";
import { FilterDrawer } from "./components/FilterDrawer";
import { FilterIcon } from "../assets/icons/FilterIcon";
import { INITIAL_FILTERS, SortOrder } from "../constants/sort";
import { CompanyCard } from "./components/CompanyCard";
import { SortDropdown } from "./components/SortDropdown";
import { CompanyFilters } from "./types/sort";

export const App = () => {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<CompanyFilters>(INITIAL_FILTERS);

  const [sortField, setSortField] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<SortOrder.ASC | SortOrder.DESC>(
    SortOrder.ASC,
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText]);

  const processedData = useMemo(() => {
    let result = [...companies];
    const isSearchActive = debouncedSearch.trim().length >= 3;
    if (isSearchActive) {
      result = searchCompanies(result, debouncedSearch);
    }
    result = filterCompanies(result, filters);
    return sortCompanies(result, sortField, sortOrder);
  }, [debouncedSearch, filters, sortField, sortOrder]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SearchBar value={searchText} onChange={setSearchText} />

        <View style={styles.controlsRow}>
          <View style={styles.sortContainer}>
            <SortDropdown
              currentField={sortField}
              currentOrder={sortOrder}
              onSortChange={(field, order) => {
                setSortField(field);
                setSortOrder(order);
              }}
            />
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.filterButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => setFilterVisible(true)}
            hitSlop={10}
          >
            <View style={styles.filterButtonInner}>
              <FilterIcon width={18} height={18} />
              <Text style={styles.filterButtonText}>Filters</Text>
            </View>
          </Pressable>
        </View>

        <FlatList
          data={processedData}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <CompanyCard company={item} />}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={
            <View style={styles.listContent}>
              <Text style={styles.emptyText}>No results found</Text>
            </View>
          }
        />

        <FilterDrawer
          visible={isFilterVisible}
          onClose={() => setFilterVisible(false)}
          filters={filters}
          setFilters={setFilters}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  controlsRow: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
  },
  sortContainer: {
    flex: 1,
  },
  filterButton: {
    height: 44,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  filterButtonInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButtonText: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  listContent: {
    padding: 12,
    paddingBottom: 24,
  },
  emptyText: {
    textAlign: "center",
  },
});
