// components/HistoryCard.tsx
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const router = useRouter();
type Charger = { id: number; charger_name: string; location: Location };
type Location = {
  id: number;
  location_name: string;
  address: string;
  city: string;
  district: string;
  ward: string;
};
type Type = { id: number; type_name: string };

type StationProps = {
  id: number;
  user_id: number;
  type: Type;
  charger: Charger;
  start_time: string;
  end_time: string;
  number_start: number;
  number_end: number;
  cost: number;
};

const HistoryCard = ({
  id,
  user_id,
  type,
  charger,
  start_time,
  end_time,
  number_end,
  number_start,
  cost,
}: StationProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {" "}
        Bạn đã sạc xe tại {charger.location.location_name || "Không rõ"}
      </Text>
      <View style={styles.infoRow}>
        <View style={styles.textInfo}>
          <Text> Trụ: {charger.charger_name}</Text>

          <Text> Loại: {type.type_name}</Text>
          <Text>
            {" "}
            Thời gian bắt đầu:{" "}
            {new Date(start_time).toLocaleDateString() || "Không rõ"}
          </Text>
          <Text>
            {" "}
            Thời gian kết thúc:
            {new Date(end_time).toLocaleDateString() || "Không rõ"}
          </Text>
          <Text> Chữ điện bắt đầu: {number_start}</Text>
          <Text> Chữ điện kết thúc: {number_end}</Text>
          <Text> Tiền: {Number(cost).toLocaleString("vi-VN")} VND</Text>
        </View>
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

export default HistoryCard;
