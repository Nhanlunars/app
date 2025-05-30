import { useAuth } from "@/app/AuthContext";
import axios from "@/axios";
import { useRouter } from "expo-router";

import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
const router = useRouter();

import HistoryCard from "@/components/HistoryCard";
import BottomNav from "./BottomNav";
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
type History = {
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
const HistoryListScreen = () => {
  const { userInfo } = useAuth();
  const [historys, setHistorys] = useState<History[]>([]);
  const getHistory = async () => {
    try {
      const response = await axios.get(
        `/api/get-all-history-by-userid?user_id=${userInfo?.id}`
      );
      setHistorys(response.data.historys);
      console.log("history", response.data.historys);
    } catch (error) {
      console.error("Error loading historys:", error);
    }
  };
  useEffect(() => {
    if (userInfo?.id) {
      getHistory();
    }
  }, [userInfo?.id]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
        {/* <ScrollView contentContainerStyle={{ padding: 10 }}> */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Lịch Sử</Text>
        </View>

        <FlatList
          data={historys}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <HistoryCard {...item} />}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        {/* </ScrollView> */}
      </SafeAreaView>
      <View style={styles.footer}>
        <BottomNav />
      </View>
    </View>
  );
};

export default HistoryListScreen;

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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
