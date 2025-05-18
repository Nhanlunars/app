import StationCard from "@/components/StationCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const stations = [
  {
    id: "001",
    name: "Trạm Sạc Xe Máy Điện",
    location: "Cửa Hàng Xăng Dầu",
    status: "Còn Trống",
  },
  {
    id: "002",
    name: "Trạm Sạc Xe Máy Điện",
    location: "Cửa Hàng Sửa Chữa",
    status: "Còn Trống",
  },
  {
    id: "003",
    name: "Trạm Sạc Xe Máy Điện",
    location: "Cửa Hàng Sửa Chữa",
    status: "Hết Chỗ",
  },
];

const StationListScreen = () => {
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "in_use">("all");

  const filteredStations = stations.filter((station) => {
    const matchSearch = station.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus =
      filterTab === "all" ? true : station.status !== "Còn Trống";
    return matchSearch && matchStatus;
  });

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm Kiếm........."
          value={search}
          onChangeText={setSearch}
        />
        <Ionicons
          name="filter"
          size={20}
          color="#000"
          style={styles.filterIcon}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, filterTab === "all" && styles.activeTab]}
          onPress={() => setFilterTab("all")}
        >
          <Text style={styles.tabText}>Tất Cả</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, filterTab === "in_use" && styles.activeTab]}
          onPress={() => setFilterTab("in_use")}
        >
          <Text style={styles.tabText}>Đang Sử Dụng</Text>
        </TouchableOpacity>
      </View>

      {/* Station List */}
      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StationCard {...item} />}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#000" />
        <MaterialCommunityIcons
          name="battery-charging"
          size={24}
          color="#000"
        />
        <Ionicons name="notifications-outline" size={24} color="#000" />
        <Ionicons name="settings-outline" size={24} color="#000" />
      </View>
    </View>
  );
};

export default StationListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f7f7f7" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchInput: { flex: 1, height: 40 },
  filterIcon: { marginLeft: 8 },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  activeTab: {
    backgroundColor: "#00bcd4",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#00bcd4",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
