import axios from "@/axios";
import { useRouter } from "expo-router";
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
const LocationListScreen = () => {
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

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
        <ScrollView contentContainerStyle={{ padding: 10 }}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Danh Sách Trạm Sạc</Text>
            </View>

            {locations.map((location) => (
              <View key={location.id} style={styles.stationCard}>
                <Icon name="flash-outline" size={28} color="#000" />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.stationTitle}>
                    Tên Trạm: {location.location_name || "Không rõ"}
                  </Text>
                  <Text style={styles.stationSubtitle}>
                    Địa Chỉ:{" "}
                    {location.address +
                      " " +
                      location.ward +
                      " " +
                      location.district +
                      " " +
                      location.city || "Chưa có vị trí"}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text
                    style={styles.detailText}
                    onPress={() =>
                      router.push({
                        pathname: "/LocationScreen",
                        params: { location_id: location.id },
                      })
                    }
                  >
                    Xem Chi Tiết
                  </Text>
                </TouchableOpacity>
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

export default LocationListScreen;

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
