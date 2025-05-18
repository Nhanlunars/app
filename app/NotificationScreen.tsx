import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Footer from "./footer";
import BottomNav from "./BottomNav";
const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông Báo</Text>
      </View>

      {/* Notification */}
      <View style={styles.notificationContainer}>
        <Text style={styles.mainText}>
          Bạn Đã Đặt Lịch Trạm Sạc Thành Công{"\n"}
          Tại Cửa Hàng Xăng Dầu Ở Trụ Số 001{"\n"}
          <Text style={styles.note}>
            Lưu Ý: Sẽ Tự Động Huỷ Sau 20 Phút (10h00–10h20)
          </Text>
        </Text>
        <View style={styles.divider} />
        <Text style={styles.timeText}>10:00 05/04/2025</Text>
      </View>

      {/* Bottom Navigation */}
      {/* <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/")}
        >
          <Ionicons name="home" size={24} color="#000" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/StationListScreen")}
        >
          <MaterialCommunityIcons
            name="battery-charging"
            size={24}
            color="#000"
          />
          <Text style={styles.navLabel}>Charge</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/NotificationScreen")}
        >
          <Ionicons name="notifications-outline" size={24} color="#000" />
          <Text style={styles.navLabel}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/SettingScreen")}
        >
          <Ionicons name="settings-outline" size={24} color="#000" />
          <Text style={styles.navLabel}>Setting</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.bottomNav}>
        <Footer />
        <BottomNav />
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
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
  notificationContainer: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  mainText: {
    fontSize: 14,
    marginBottom: 10,
    lineHeight: 20,
  },
  note: {
    fontWeight: "bold",
    color: "#444",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 8,
  },
  timeText: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    height: 70,
    width: "100%",
    backgroundColor: "#57d2d2",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 10,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#000",
  },
});
