import axios from "@/axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNav from "./BottomNav";
const router = useRouter();
const LocationScreen = () => {
  type Location = {
    id: number;
    location_name: string;
    address?: string;
    ward?: string;
    district?: string;
    city?: string;
  };
  type Charger = {
    id: number;
    charger_name: string;
    location: Location;
    last_maintence_date: string;
    installation_date: string;
    createdAt: string;
    updatedAt: string;
  };
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
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          <View style={styles.section}>
            {chargers.length === 0 ? (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    Trạm Sạc: {location.location_name}
                  </Text>
                </View>
                <Text style={styles.stationTitle}>
                  Địa Chỉ:{" "}
                  {locations.address +
                    " " +
                    locations.ward +
                    " " +
                    locations.district +
                    " " +
                    locations.city || "Không rõ"}
                </Text>
                <Text style={styles.sectionTitle}>Không có trạm sạc nào.</Text>
              </>
            ) : (
              ""
            )}

            {chargers.map((charger, index) => (
              <View key={charger.id}>
                {index === 0 && (
                  <>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        Trạm Sạc {charger.location.location_name}
                      </Text>
                    </View>
                    <Text style={styles.stationTitle}>
                      Địa Chỉ:{" "}
                      {charger.location.address +
                        " " +
                        charger.location.ward +
                        " " +
                        charger.location.district +
                        " " +
                        charger.location.city || "Không rõ"}
                    </Text>
                    <br />
                  </>
                )}

                <View style={styles.stationCard}>
                  <Icon name="flash-outline" size={28} color="#000" />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.stationTitle}>
                      Tên Trụ: {charger.charger_name || "Không rõ"}
                    </Text>
                    <Text style={styles.stationSubtitle}>
                      Ngày lắp đặt:
                      {new Date(
                        charger.installation_date
                      ).toLocaleDateString() || "Không rõ"}
                    </Text>
                    <Text style={styles.stationSubtitle}>
                      Ngày bảo trì:{" "}
                      {new Date(
                        charger.last_maintence_date
                      ).toLocaleDateString() || "Không rõ"}
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
              </View>
            ))}
          </View>
        </ScrollView>
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
  section: { marginBottom: 20 },
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
  stationTitle: { fontSize: 13, fontWeight: "bold", marginBottom: 2 },
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
