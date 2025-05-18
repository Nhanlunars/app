import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const router = useRouter();
const Footer = () => {
  return (
    <View style={styles.footer}>
      <FooterItem icon="home" label="Home" route="/HomeScreen" />
      <FooterItem icon="flash" label="Charge" route="/StationListScreen" />
      <FooterItem
        icon="notifications-outline"
        label="Notification"
        route="/NotificationScreen"
      />
      <FooterItem
        icon="settings-outline"
        label="Setting"
        route="/SettingScreen"
      />
    </View>
  );
};

const FooterItem = ({
  icon,
  label,
  route,
}: {
  icon: string;
  label: string;
  route:
    | "/HomeScreen"
    | "/StationListScreen"
    | "/NotificationScreen"
    | "/SettingScreen";
}) => (
  <TouchableOpacity style={styles.item} onPress={() => router.push(route)}>
    <Icon name={icon} size={24} color="#000" />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 70,
    backgroundColor: "#57d2d2",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 10,
  },
  item: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: "#000",
    marginTop: 4,
  },
});
