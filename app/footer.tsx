import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const router = useRouter();
const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bottomNav}>
        <NavItem
          icon="home"
          label="Home"
          onPress={() => router.push("/HomeScreen")}
        />
        <NavItem
          icon="flash"
          label="Charge"
          onPress={() => router.push("/StationListScreen")}
        />
        <NavItem
          icon="notifications-outline"
          label="Notification"
          onPress={() => router.push("/NotificationScreen")}
        />
        <NavItem
          icon="settings-outline"
          label="Setting"
          onPress={() => router.push("/SettingScreen")}
        />
      </View>
    </View>
  );
};

const MenuItem = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      {icon}
      <Text style={styles.menuLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#000" />
  </TouchableOpacity>
);

const NavItem = ({ icon, label, onPress }: any) => (
  <TouchableOpacity style={styles.navItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#000" />
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

export default Footer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  header: {
    backgroundColor: "#57d2d2",
    height: 50,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  userName: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: "500",
  },
  menu: {
    paddingHorizontal: 16,
    gap: 10,
  },
  menuItem: {
    backgroundColor: "#b9f4f4",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuLabel: {
    fontSize: 14,
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
