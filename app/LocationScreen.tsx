import axios from "@/axios";
import ChargerCard from "@/components/ChargerCard";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
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
type Location = {
  id: number;
  location_name: string;
  address: string;
  ward: string;
  district: string;
  city: string;
};
type Charger = {
  id: number;
  charger_name: string;
  location: Location;
  last_maintence_date: string;
  installation_date: string;
};
const LocationScreen = () => {
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [locations, setLocations] = useState<Location>();
  const [search, setSearch] = useState("");
  const { location_id } = useLocalSearchParams();

  const getChargerByLocation = async () => {
    try {
      const response = await axios.get(
        `/api/get-all-charger-by-locationid?location_id=${location_id}`
      );
      const local = await axios.get(`/api/get-all-location?id=${location_id}`);
      setChargers(response.data.chargers.reverse());
      setLocations(local.data.locations);
      console.log("charger", response.data.chargers);
      console.log("local", local.data.locations);
    } catch (error) {
      console.error("Error loading location:", error);
    }
  };
  useEffect(() => {
    getChargerByLocation();
  }, []);

  const filteredChargers = chargers.filter((charger) => {
    const matchSearch = charger.charger_name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchSearch;
  });

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
        {/* <ScrollView contentContainerStyle={{ padding: 10 }}> */}
          {!locations ? (
            <Text>Loading....</Text>
          ) : (
            <>
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                      {' '}Trạm Sạc: {locations.location_name}
                  </Text>
                </View>
                <Text style={styles.stationTitle}>
                  {' '}Địa Chỉ:{" "}
                  {locations.address +
                    " " +
                    locations.ward +
                    " " +
                    locations.district +
                    " " +
                    locations.city || "Không rõ"}
                </Text>
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
              {chargers.length === 0 ? (
                <>
                  <Text style={styles.sectionTitle}>
                    {' '}Không có trạm sạc nào.
                  </Text>
                </>
              ) : (
                <FlatList
                  data={filteredChargers}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <ChargerCard {...item} />}
                  contentContainerStyle={{ paddingBottom: 100 }}
                />
              )}
            </>
          )}
        {/* </ScrollView> */}
      </SafeAreaView>
      <View style={styles.footer}>
        <BottomNav />
      </View>
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fefefe" },
  header: {
    backgroundColor: "#64C2CD",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
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
  section: { marginBottom: 10 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
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
  stationTitle: { fontSize: 13, fontWeight: "bold", marginBottom: 10 },
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
});
