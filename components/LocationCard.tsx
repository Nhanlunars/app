// components/LocationCard.tsx
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const router = useRouter();

type StationProps = {
  id: number;
  location_name: string;
  address: string;
  city: string;
  district: string;
  ward: string;
};

const LocationCard = ({
  id,
  location_name,
  address,
  city,
  district,
  ward,
}: StationProps) => (
  <View style={styles.card}>
    <Text style={styles.title}>Tên Trạm Sạc {location_name}</Text>
    <View style={styles.infoRow}>
      <Icon name="location" size={24} color="black" />
      <View style={styles.textInfo}>
        <Text>
          Địa Chỉ: {address} {ward} {district} {city}
        </Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/LocationScreen",
              params: { location_id: id },
            })
          }
        >
          <Text style={styles.detailText}>Xem Chi Tiết</Text>
        </TouchableOpacity>
      
    </View>
  </View>
);

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
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 8, // khoảng cách giữa địa chỉ và nút
  },
  detailText: {
    color: "#007AFF",
    fontSize: 12,
    alignSelf: "flex-end", // đẩy sang phải trong cột
    marginTop: 4,
  },
});

export default LocationCard;
