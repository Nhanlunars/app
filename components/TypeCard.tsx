// components/TypeCard.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const router = useRouter();

type StationProps = {
  id: number;
  type_name: string;
  default_price: string;
  describe: string;

  status: string;
};
const getStatusInfo = (status: string) => {
  switch (status) {
    case "S1":
      return { text: "Đang bảo trì", color: "red" };
    case "S2":
      return { text: "Đã được đặt trước", color: "yellow" };
    case "S3":
      return { text: "Đang sạc", color: "blue" };
    default:
      return { text: "Đang sẵn sàng", color: "green" };
  }
};

const TypeCard = ({
  id,
  type_name,
  default_price,
  describe,
  status,
}: StationProps) => {
  const { text: statusText, color: statusColor } = getStatusInfo(status);
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Loại Sạc: {type_name}</Text>
      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="ev-station" size={24} color="black" />
        <View style={styles.textInfo}>
          <Text>Giá tiền: {default_price}</Text>
          <Text>Mô tả: {describe}</Text>
          <Text>
            Trạng Thái: <Text style={{ color: statusColor }}>{statusText}</Text>
          </Text>{" "}
        </View>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/TypeScreen",
              params: { type_id: id },
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
  },
  detailText: {
    color: "#007AFF",
    fontSize: 12,
    alignSelf: "flex-end", // đẩy sang phải trong cột
    marginTop: 4,
  },
});

export default TypeCard;
