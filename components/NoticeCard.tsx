// components/NoticeCard.tsx
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const router = useRouter();

type StationProps = {
  id: number;
  title: string;
  message: string;
};

const NoticeCard = ({ id, title, message }: StationProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}> {title || "Không rõ"}</Text>
      <View style={styles.infoRow}>
        <View style={styles.textInfo}>
          <Text> {message}</Text>
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

export default NoticeCard;
