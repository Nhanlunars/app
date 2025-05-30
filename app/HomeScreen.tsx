import axios from "@/axios";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
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

type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  // ... thêm các màn khác nếu có
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen = ({ navigation }: Props) => {
  type Location = {
    id: number;
    location_name: string;
    location: string;
    //location_name: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    lat: number;
    lng: number;
    createdAt: string;
    updatedAt: string;
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
        <ScrollView contentContainerStyle={{ padding: 3 }}>
          <View style={styles.header}>
            <Image
              source={require("@/assets/images/icon.png")} // hình avatar người dùng
              style={styles.avatar}
            />
            <Text style={styles.welcomeText}>Chào Mừng Bạn</Text>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/MapLocation")}
            >
              <Icon name="map-outline" size={24} color="#000" />
              <Text style={styles.menuText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}>
              <Icon name="qr-code-outline" size={24} color="#000" />
              <Text style={styles.menuText}>QR Code</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem}   onPress={() => router.push("/HistoryListScreen")}>
              <Icon name="time-outline" size={24} color="#000" />
              <Text style={styles.menuText}>History</Text>
            </TouchableOpacity>
          </View>

          {/* <ScrollView style={styles.content}> */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}> Danh Sách Trạm Sạc</Text>
              <TouchableOpacity
                onPress={() => router.push("/LocationListScreen")}
              >
                <Text style={styles.viewAll}>Xem Tất Cả </Text>
              </TouchableOpacity>
            </View>
            {!locations ? (
              <p>Loading....</p>
            ) : (
              <>
                {locations.slice(0, 5).map((location) => (
                  <View key={location.id} style={styles.stationCard}>
                    <Icon name="location" size={28} color="#000" />
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
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: "/LocationScreen",
                          params: { location_id: location.id },
                        })
                      }
                    >
                      <Text style={styles.detailText}>Xem Chi Tiết</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Đánh Giá Gần Đây</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>Xem Tất Cả</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.reviewRow}>
              <View style={styles.reviewCard}>
                <Icon name="person-circle-outline" size={24} />
                <Text>Văn A</Text>
                <Text>⭐⭐⭐⭐⭐</Text>
              </View>
              <View style={styles.reviewCard}>
                <Icon name="person-circle-outline" size={24} />
                <Text>Văn B</Text>
                <Text>⭐⭐⭐⭐</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <BottomNav />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fefefe" },
  header: {
    backgroundColor: "#64C2CD",
    padding: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
    marginTop: 5,
    marginBottom: 5,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 16 },
  viewAll: { fontSize: 12, color: "#007AFF", justifyContent: "space-around" },
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
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    width: "48%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
