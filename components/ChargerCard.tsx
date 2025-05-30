// components/ChargerCard.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const router = useRouter();

type StationProps = {
  id: number;
  charger_name: string;
  location: Location;
  last_maintence_date: string;
  installation_date: string;
};
type Location = {
  id: number;
  location_name: string;
  address: string;
  city: string;
  district: string;
  ward: string;
};

const ChargerCard = ({
  id,
  charger_name,
  location,
  last_maintence_date,
  installation_date,
}: StationProps) => {
  const { address, city, district, ward } = location;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tên Trụ: {charger_name || "Không rõ"}</Text>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="ev-station" size={24} color="black" />
        <View style={styles.textInfo}>
          <Text>
            Ngay Lap Dat:{" "}
            {new Date(installation_date).toLocaleDateString() || "Không rõ"}
          </Text>
          <Text>
            Ngay Bao Tri:{" "}
            {new Date(last_maintence_date).toLocaleDateString() || "Không rõ"}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/ChargerScreen",
              params: { charger_id: id },
            })
          }
        >
          <Text style={styles.detailText}>Xem Chi Tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#e5e5e5",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInfo: {
    marginLeft: 10,
    flex: 1, 
  },
  detailText: { color: "#007AFF", fontSize: 12 },
});

export default ChargerCard;
