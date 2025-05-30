import axios from "@/axios";
import ChargerCard from "@/components/ChargerCard";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNav from "./BottomNav";
const router = useRouter();

type Location = {
  id: number;
  location_name: string;
  address: string;
  city: string;
  district: string;
  ward: string;
  lat: number;
  lng: number;
};
type Charger = {
  id: number;
  charger_name: string;
  location: Location;
  last_maintence_date: string;
  installation_date: string;
};

const ChargerListScreen = () => {
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [search, setSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "in_use">("all");
  const getCharger = async () => {
    try {
      const response = await axios.get(`/api/get-all-charger?id=${"All"}`);
      setChargers(response.data.chargers); // điều chỉnh nếu data nằm trong `response.data.data`
      console.log("charger", response.data.chargers);
    } catch (error) {
      console.error("Error loading chargers:", error);
    }
  };
  useEffect(() => {
    getCharger();
  }, []);
  const filteredChargers = chargers.filter((charger) => {
    const matchSearch = charger.charger_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = "a";
    // filterTab === "all" ? true : charger.status !== "Còn Trống";
    return matchSearch && matchStatus;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
        {/* <ScrollView contentContainerStyle={{ padding: 10 }}> */}
        {/* Search Bar */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Danh Sách Trụ Sạc</Text>
        </View>
        {/* <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Danh Sách Trạm Sạc</Text>
          </View>
        </View> */}
                    <View style={{ padding: 5, paddingBottom: 10 }}>
        
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

        {/* Charger List */}
        <FlatList
          data={filteredChargers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ChargerCard {...item} />}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        {/* {chargers.map((charger) => (
            <View key={charger.id} style={styles.stationCard}>
              <Icon name="flash-outline" size={28} color="#000" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.stationTitle}>
                  Tên Máy: {charger.charger_name || "Không rõ"}
                </Text>
                <Text style={styles.stationSubtitle}>
                  Vị Trí: {charger.location.location_name || "Chưa có vị trí"}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/ChargerScreen",
                    params: { charger_id: charger.id },
                  })
                }
              >
                <Text style={styles.detailText}>Xem Chi Tiết</Text>
              </TouchableOpacity>
            </View>
          ))} */}
        {/* </ScrollView> */}
      </SafeAreaView>
      <View style={styles.footer}>
        <BottomNav />
      </View>
    </View>
  );
};

export default ChargerListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fefefe" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#57d2d2",
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  section: { marginBottom: 0 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 16 },
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
