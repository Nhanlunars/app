import { useAuth } from "@/app/AuthContext";
import axios from "@/axios";
import { useRouter } from "expo-router";

import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView,
  ScrollView,StyleSheet, Text, View } from "react-native";
const router = useRouter();

import NoticeCard from "@/components/NoticeCard";
import BottomNav from "./BottomNav";

type Notice = {
  id: number;
  title: string;
  message: string;
};
const NotificationScreen = () => {
  const { userInfo } = useAuth();
  const [notices, setNotices] = useState<Notice[]>([]);
  const getNotice = async () => {
    try {
      const response = await axios.get(
        `/api/get-all-notification-by-userid?user_id=${userInfo?.id}`
      );
      setNotices(response.data.notifications);
      console.log("notice", response.data.notifications);
      console.log("id", userInfo?.id);
    } catch (error) {
      console.error("Error loading notices:", error);
    }
  };
  useEffect(() => {
    if (userInfo?.id) {
      getNotice();
    }
  }, [userInfo?.id]);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
              {/* <ScrollView contentContainerStyle={{ padding: 10 }}> */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Thông Báo</Text>
      </View>

      {/* Notification */}
      {/* <View style={styles.notificationContainer}>
        <Text style={styles.mainText}>
          Bạn Đã Đặt Lịch Trạm Sạc Thành Công{"\n"}
          Tại Cửa Hàng Xăng Dầu Ở Trụ Số 001{"\n"}
          <Text style={styles.note}>
            Lưu Ý: Sẽ Tự Động Huỷ Sau 20 Phút (10h00–10h20)
          </Text>
        </Text>
        <View style={styles.divider} />
        <Text style={styles.timeText}>10:00 05/04/2025</Text>
      </View> */}
      <FlatList
        data={notices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <NoticeCard {...item} />}
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
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
