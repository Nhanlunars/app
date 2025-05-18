import { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
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
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/icon.png")} // hình avatar người dùng
          style={styles.avatar}
        />
        <Text style={styles.welcomeText}>Chào Mừng Bạn</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="map-outline" size={24} color="#000" />
          <Text style={styles.menuText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="qr-code-outline" size={24} color="#000" />
          <Text style={styles.menuText}>QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Icon name="time-outline" size={24} color="#000" />
          <Text style={styles.menuText}>History</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Danh Sách Trạm Sạc</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>Xem Tất Cả</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.stationCard}>
            <Icon name="flash-outline" size={28} color="#000" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.stationTitle}>
                Tên Máy: Trạm Sạc Xe Máy Điện
              </Text>
              <Text style={styles.stationSubtitle}>
                Vị Trí: Cửa Hàng Xăng Dầu
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.detailText}>Xem Chi Tiết</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.stationCard}>
            <Icon name="flash-outline" size={28} color="#000" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.stationTitle}>
                Tên Máy: Trạm Sạc Xe Máy Điện
              </Text>
              <Text style={styles.stationSubtitle}>
                Vị Trí: Cửa Hàng Sửa Chữa
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.detailText}>Xem Chi Tiết</Text>
            </TouchableOpacity>
          </View>
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

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.push("/HomeScreen")}>
          <Icon name="home" size={24} color="#000" />
          <Text style={styles.footer}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/StationListScreen")}>
          <Icon name="flash" size={24} color="#000" />
          <Text style={styles.footer}>Charge</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/NotificationScreen")}>
          <Icon name="notifications-outline" size={24} color="#000" />
          <Text style={styles.footer}>Notification</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/SettingScreen")}>
          <Icon name="settings-outline" size={24} color="#000" />
          <Text style={styles.footer}>Setting</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
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
  content: { padding: 16 },
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
