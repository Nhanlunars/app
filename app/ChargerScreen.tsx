import axios from "@/axios";
import StationCard from "@/components/StationCard";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNav from "./BottomNav";
const stations = [
  {
    id: "001",
    name: "Trạm Sạc Xe Máy Điện",
    location: "Cửa Hàng Xăng Dầu",
    status: "Còn Trống",
  },
  {
    id: "002",
    name: "quang chau",
    location: "Cửa Hàng Sửa Chữa",
    status: "Còn Trống",
  },
  {
    id: "003",
    name: "phong nam",
    location: "Cửa Hàng Sửa Chữa",
    status: "Hết Chỗ",
  },
];
type Location = {
  id: number;
  location_name: string;
  address: string;
  city: string;
  district: string;
  ward: string;
};
type Charger = {
  id: number;
  charger_name: string;
  location: Location;
  type: Type;
  status: string;
  updatedAt: string;
};
type Type = {
  id: number;
  type_name: string;
  default_price: string;
  describe: string;
  status: string;
};

const ChargerListScreen = () => {
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const { charger_id } = useLocalSearchParams();
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "S1" | "S4">("all");
  const getCharger = async () => {
    try {
      const response = await axios.get(`/api/get-all-charger?id=${charger_id}`);
      const allType = await axios.get(
        `/api/get-all-type-by-chargerid?charger_id=${charger_id}`
      );

      setChargers(response.data.chargers); // điều chỉnh nếu data nằm trong `response.data.data`
      setTypes(allType.data.types);
      console.log("charger", response.data.chargers);
      console.log("type", allType.data.types);
    } catch (error) {
      console.error("Error loading chargers:", error);
    }
  };
  useEffect(() => {
    getCharger();
  }, []);
  // const filteredStations = stations.filter((station) => {
  const filteredStations = types.filter((type) => {
    const matchSearch = type.type_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = filterTab === "all" ? true : type.status !== filterTab;
    return matchSearch && matchStatus;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
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
              style={[styles.tab, filterTab === "S1" && styles.activeTab]}
              onPress={() => setFilterTab("S1")}
            >
              <Text style={styles.tabText}>Đang Sử Dụng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, filterTab === "S4" && styles.activeTab]}
              onPress={() => setFilterTab("S4")}
            >
              <Text style={styles.tabText}>Đang Sử Dụng</Text>
            </TouchableOpacity>
          </View>

          {/* Station List */}
          <FlatList
            data={filteredStations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <StationCard {...item} />}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          {/* {types.map((type) => (
            <View key={type.id} style={styles.stationCard}>
              <Icon name="flash-outline" size={28} color="#000" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.stationTitle}>
                  Tên Máy: {type.type_name || "Không rõ"}
                </Text>
                <Text style={styles.stationSubtitle}>
                  Giá: {type.default_price || "Không rõ"}
                </Text>
                <Text style={styles.stationSubtitle}>
                  Mô tả: {type.describe || "Không rõ"}
                </Text>
                <Text style={styles.stationSubtitle}>
                  Trạng thái: {type.status || "Không rõ"}
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.detailText}>Xem Chi Tiết</Text>
              </TouchableOpacity>
            </View>
          ))} */}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <BottomNav />
      </View>
    </View>
  );
};

export default ChargerListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fefefe" },
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
    backgroundColor: "#57d2d2",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  stationCard: {
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stationTitle: { fontSize: 13, fontWeight: "bold" },
  stationSubtitle: { fontSize: 12, color: "#333" },
  detailText: { color: "#007AFF", fontSize: 12 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
