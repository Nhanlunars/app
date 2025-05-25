import axios from "@/axios";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import LocationCard from "@/components/LocationCard";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BottomNav from "./BottomNav";

const router = useRouter();
const LocationListScreen = () => {
  const [search, setSearch] = useState("");

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

  const getLocation = async () => {
    try {
      const response = await axios.get(`/api/get-all-location?id=${"All"}`);
      setLocations(response.data.locations.reverse()); // điều chỉnh nếu data nằm trong `response.data.data`
      console.log("location", response.data.locations);
    } catch (error) {
      console.error("Error loading location:", error);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  const [locations, setLocations] = useState<Location[]>([]);
  const filteredStations = locations.filter((location) => {
    const matchSearch = location.location_name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <View style={styles.container}>
      {!location ? (
        <p>Loading...</p>
      ) : (
        <>
          <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
            <ScrollView contentContainerStyle={{ padding: 0 }}>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Danh Sách Trạm Sạc</Text>
                </View>
              </View>
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
              <FlatList
                data={filteredStations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <LocationCard {...item} />}
                contentContainerStyle={{ paddingBottom: 15 }}
              />
            </ScrollView>
          </SafeAreaView>
          <View style={styles.footer}>
            <BottomNav />
          </View>
        </>
      )}
    </View>
  );
};

export default LocationListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fefefe" },
  header: {
    backgroundColor: "#64C2CD",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingBottom: 0,
  },
  searchInput: { flex: 1, height: 40, padding: 10 },
  filterIcon: { marginLeft: 8 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  welcomeText: { fontSize: 18, fontWeight: "bold", color: "#072541" },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#EDEDED",
    marginTop: 10,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  menuItem: { alignItems: "center" },
  menuText: { fontSize: 12, marginTop: 4 },
  content: { paddingBottom: 0 },
  section: { marginBottom: 0 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 16 },
  viewAll: { fontSize: 12, color: "#007AFF" },
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
  reviewRow: { flexDirection: "row", justifyContent: "space-around" },
  reviewCard: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    width: "45%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
