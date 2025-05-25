import axios from "@/axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import BottomNav from "./BottomNav";

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
const getStatusInfo = (status: string) => {
  switch (status) {
    case "S1":
      return { text: "Đang bảo trì", color: "red" };
    case "S2":
      return { text: "Đã được đặt trước", color: "yellow" };
    case "S3":
      return { text: "Đang sạc", color: "blue" };
    default:
      return { text: "Đang sẵn sàng", color: "green" };
  }
};
const TypeScreen = () => {
  // const [chargers, setChargers] = useState<Charger>();
  const [types, setTypes] = useState<Type>();
  const { type_id } = useLocalSearchParams();
  const getCharger = async () => {
    try {
      const response = await axios.get(`/api/get-all-type?id=${type_id}`);
      // const allType = await axios.get(
      //   `/api/get-all-type-by-chargerid?type_id=${type_id}`
      // );

      setTypes(response.data.types); // điều chỉnh nếu data nằm trong `response.data.data`
      // setTypes(allType.data.types);
      console.log("charger", response.data.types);
      // console.log("type", allType.data.types);
    } catch (error) {
      console.error("Error loading chargers:", error);
    }
  };
  useEffect(() => {
    getCharger();
  }, []);

  const { text: statusText, color: statusColor } = getStatusInfo(status);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          {!types ? (
            <p>Loading....</p>
          ) : (
            <>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Loại Sạc: {types.type_name}
                </Text>
              </View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Giá: {types.default_price}
                </Text>
              </View>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  Trạng Thái:{" "}
                  <Text style={{ color: statusColor }}>{statusText}</Text>
                </Text>
              </View>
            </>
          )}
          {/* Search Bar */}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <BottomNav />
      </View>
    </View>
  );
};

export default TypeScreen;

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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 16 },
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
