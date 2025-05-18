// components/StationCard.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type StationProps = {
  id: string;
  name: string;
  location: string;
  status: string;
};

const StationCard = ({ id, name, location, status }: StationProps) => (
  <View style={styles.card}>
    <Text style={styles.title}>Trạm Sạc {id}</Text>
    <View style={styles.infoRow}>
      <MaterialCommunityIcons name="ev-station" size={24} color="black" />
      <View style={styles.textInfo}>
        <Text>Tên Máy: {name}</Text>
        <Text>Vị Trí: {location}</Text>
        <Text>Trạng Thái: {status}</Text>
      </View>
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
    marginLeft: 10,
  },
});

export default StationCard;
