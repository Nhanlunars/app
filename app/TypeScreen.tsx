import { useAuth } from "@/app/AuthContext";
import axios from "@/axios";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import BottomNav from "./BottomNav";
const router = useRouter();

// type Location = {
//   id: number;
//   location_name: string;
//   address: string;
//   city: string;
//   district: string;
//   ward: string;
// };
type Charger = {
  id: number;
  charger_name: string;
  location: Location;
  type_id: string;
  status: string;
  updatedAt: string;
};
type Type = {
  id: number;
  charger: Charger;
  type_name: string;
  default_price: string;
  describe: string;
  status: string;
  energy: string;
};
type Reser = {
  id: number;
  charger_id: number;
  type_id: number;
  start_time: Date;
  end_time: Date;
  user_id: number;
  number_start: string;
  number_end: string;
};
const getStatusInfo = (status: string) => {
  switch (status) {
    case "S1":
      return { text: "Đang bảo trì", color: "red" };
    case "S2":
      return { text: "Đã được đặt trước", color: "orange" };
    case "S3":
      return { text: "Đang sạc", color: "blue" };
    default:
      return { text: "Đang sẵn sàng", color: "green" };
  }
};
const TypeScreen = () => {
  const { userInfo } = useAuth();
  const [types, setTypes] = useState<Type | null>(null);
  const [resers, setResers] = useState<Reser | null>(null);
  const [hiss, setHiss] = useState<Reser | null>(null);
    const [energy, setEnergy] = useState<number>(0);
  const [messages, setMessages] = useState("");
  const { type_id } = useLocalSearchParams();
  const getCharger = async () => {
    try {
      const response = await axios.get(`/api/get-all-type?id=${type_id}`);
      const reser = await axios.get(
        `/api/get-reservation-by-typeid?type_id=${type_id}`
      );

      const his = await axios.get(
        `/api/get-history-by-typeid?type_id=${type_id}`
      );

      setHiss(his.data.historys);
      setTypes(response.data.types); // điều chỉnh nếu data nằm trong `response.data.data`
      setResers(reser.data.reservations);
      // console.log("type", response.data.types);
      // console.log("reser", reser.data.reservations);
      // console.log("his", his.data.historys);
    } catch (error) {
      console.error("Error loading chargers:", error);
    }
  };
  const createReservation = async () => {
    try {
      const response = await axios.post(`/api/create-reservation`, bookingData);
      const message = response.data.messages;
      setMessages(response.data.messages);
      console.log("message", response.data.messages);
      // console.log("repos", response);
      return message;
    } catch (error) {
      console.error("Error loading chargers:", error);
      return null;
    }
  };
  const startCharging = async () => {
    try {
      const response = await axios.post(`/api/create-history`, {
        ...bookingData,
        status: "S3",
      });
      // console.log("bk", bookingData);
      setMessages(response.data.messages);

      // console.log("start Charger", response);
    } catch (error) {
      console.error("Error loading chargers:", error);
    }
  };
  const endCharging = async () => {
    if ((energy == null) && !types?.charger?.id && !types?.id) {
      console.error("Missing type");
      return;
    }
    if (!userInfo?.id) {
      console.error("Missing userInfo");
      return;
    }
    if (!hiss?.id) {
      console.error("Missing id");
      return;
    }
    try {
      const response = await axios.put(`/api/edit-history`, {
        id: hiss?.id,
        charger_id: types?.charger.id,
        user_id: userInfo?.id,
        type_id: types?.id,
        end_time: new Date().toLocaleString(),
        number_end: energy,
        status: "S4",
      });
      // console.log("id", hiss?.id);
      // console.log("user_id", userInfo?.id);
      // console.log("charger", types?.charger.id);
      // console.log("end", types?.energy);
      // console.log("end Charger", response);
    } catch (error) {
      console.error("Error loading chargers:", error);
    }
  };
  const book = async () => {
    try {
      const respon = await axios.post(`/api/create-notification`, {
        user_id: userInfo?.id,
        type_id: type_id,
        charger_id: types?.charger.id,
        title: "Bạn đã đặt lịch sạc thành công",
        message: `Bạn đã đặt lịch sạc thành công tại trạm sạc ${types?.charger.charger_name}, trụ sạc ${types?.type_name} với vào lúc ${bookingData.start_time}. Lưu ý: Sạc sẽ tự động hủy sau 20 phút.`,
      });
      // console.log("id", type_id);
      console.log("repos", respon);
    } catch (error) {
      console.error("Error create notice:", error);
    }
  };
  const cancel = async () => {
    try {
      const respon = await axios.post(`/api/create-notification`, {
        user_id: userInfo?.id,
        type_id: type_id,
        charger_id: types?.charger.id,
        title: "Bạn đã hủy thành công",
        message: `Bạn đã hủy sạc thành công tại trạm sạc ${types?.charger.charger_name}, trụ sạc ${types?.type_name} với vào lúc ${bookingData.start_time}`,
      });
      // console.log("id", type_id);
      // console.log("repos", respon);
    } catch (error) {
      console.error("Error create notice:", error);
    }
  };
  const done = async () => {
    try {
      const respon = await axios.post(`/api/create-notification`, {
        user_id: userInfo?.id,
        type_id: type_id,
        charger_id: types?.charger.id,
        title: "Bạn đã sạc xong",
        message: `Bạn đã sạc xong tại trạm sạc ${types?.charger.charger_name}, trụ sạc ${types?.type_name} với vào lúc ${bookingData.start_time}`,
      });
      // console.log("id", type_id);
      // console.log("repos", respon);
    } catch (error) {
      console.error("Error create notice:", error);
    }
  };

  const setTpye = async () => {
    try {
      const respon = await axios.put(`/api/edit-type`, {
        id: type_id,
        status: "S4",
      });
      // console.log("id", type_id);
      // console.log("repos", respon);
    } catch (error) {
      console.error("Error loading chargers:", error);
    }
  };
  useEffect(() => {
    getCharger(); // Gọi khi component mount
  }, []);
  useEffect(() => {
    const fetchEnergy = async () => {
      try {
        const response = await axios.get(`/api/get-all-type?id=${type_id}`);
        setEnergy(response.data.types.energy);
      } catch (error) {
        console.error('Error fetching energy:', error);
      }
    };

    fetchEnergy(); // Lấy lần đầu ngay khi mount

    const intervalId = setInterval(fetchEnergy, 1000); // 1000 ms = 1 giây

    // Cleanup khi component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (userInfo?.id) {
      setBookingData((prev) => ({
        ...prev,
        user_id: userInfo.id.toString(),
      }));
    }
  }, [userInfo]);
  // useEffect(() => {
  //   if (messages) {
  //     console.log("Show message:", messages);
  //   }
  // }, [messages]);
  useEffect(() => {
    if (types && types.charger) {
      setBookingData((prev) => ({
        ...prev,
        type_id: types.id?.toString() ?? "",
        charger_id: types.charger.id?.toString() ?? "",
        number_start: energy ? energy.toString() : "0", // đây là phần gây lỗi
      }));
    }
  }, [types]);

  useEffect(() => {
    // console.log("useEffect chạy để set thời gian đặt trước");
    const now = new Date();
    // const startTime = now.toLocaleString();
    // const endTime = new Date(now.getTime() + 20 * 60 * 1000).toLocaleString();
    const startTime = format(now, "yyyy-MM-dd HH:mm:ss");
    const endTime = format(
      new Date(now.getTime() + 20 * 60 * 1000),
      "yyyy-MM-dd HH:mm:ss"
    );
    setBookingData((prev) => ({
      ...prev,
      start_time: startTime,
      end_time: endTime,
    }));
  }, []);

  const [bookingData, setBookingData] = useState({
    user_id: "", // Có thể lấy từ context, props, hoặc async storage
    charger_id: "",
    type_id: "",
    start_time: "",
    end_time: "",
    note: "",
    status: "S2",
    number_start: "",
    number_end: "",
  });
  if (!types) return null;

  const { text: statusText, color: statusColor } = getStatusInfo(types.status);
  // {console.log("model", bookingData)}
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingBottom: 60 }}>
        {/* <ScrollView contentContainerStyle={{ padding: 10 }}> */}
        {!types ? (
          <Text>Loading....</Text>
        ) : (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {" "}
                Loại Sạc: {types.type_name}
              </Text>
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {" "}
                Giá: {Number(types.default_price).toLocaleString("vi-VN")} VND
              </Text>
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {" "}
                Trạng Thái:{" "}
                <Text style={{ color: statusColor }}>{statusText}</Text>
              </Text>
            </View>

            {types.status === "S1" && (
              <>
                <Text> Sạc đang được bảo trì, vui lòng chọn loại sạc khác</Text>
              </>
            )}
            {/* {types.status === "S2" && (
                <>
                  <Text>
                    Sạc đã được đặc trước, vui lòng chọn loại sạc khác
                  </Text>
                </>
              )}
              {types.status === "S2" &&
                resers?.user_id ===
                  userInfo?.id &&(
                    <>
                      <TouchableOpacity
                        style={styles.bookButton}
                        // onPress={a}
                      >
                        <Text style={styles.bookText}> Sạc</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.bookButton}
                        // onPress={}
                      >
                        <Text style={styles.bookText}>Hủy Sạc</Text>
                      </TouchableOpacity>
                    </>
                  )} */}
            {types.status === "S2" && (
              <>
                {resers?.user_id === userInfo?.id ? (
                  <>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        {" "}
                        Chữ điện: {energy}
                      </Text>
                    </View>
                    <Text>
                      {" "}
                      Sạc sẽ tự động hủy sau{" "}
                      {resers?.end_time
                        ? new Date(resers.end_time).toLocaleTimeString()
                        : ""}
                    </Text>
                    <TouchableOpacity
                      style={styles.bookButton}
                      onPress={() => {
                        Alert.alert(
                          "Xác nhận",
                          "Bạn có muốn sạc?",
                          [
                            { text: "Huỷ", style: "cancel" },
                            {
                              text: "Sạc",
                              onPress: async () => {
                                await startCharging(); // Tạo thông báo
                                router.push({
                                  pathname: "/TypeScreen",
                                  params: { type_id: type_id },
                                });
                              },
                            },
                          ],
                          { cancelable: true }
                        );
                        // startCharging();
                        // router.push({
                        //   pathname: "/TypeScreen",
                        //   params: { type_id: type_id },
                        // });
                      }}
                    >
                      <Text style={styles.bookText}>Sạc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bookButton}
                      onPress={() => {
                        Alert.alert(
                          "Xác nhận",
                          "Bạn có muốn hủy sạc?",
                          [
                            { text: "Huỷ", style: "cancel" },
                            {
                              text: "Hủy Sạc",
                              onPress: async () => {
                                await setTpye(); // Tạo thông báo
                                await cancel(); // Tạo thông báo
                                router.push({
                                  pathname: "/TypeScreen",
                                  params: { type_id: type_id },
                                });
                              },
                            },
                          ],
                          { cancelable: true }
                        );
                        // setTpye();
                        // cancel();
                        // router.push({
                        //   pathname: "/TypeScreen",
                        //   params: { type_id: type_id },
                        // });
                      }}
                    >
                      <Text style={styles.bookText}>Hủy Sạc</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text>
                      Sạc sẽ tự động hủy sau{" "}
                      {resers?.end_time
                        ? new Date(resers.end_time).toLocaleTimeString()
                        : ""}
                    </Text>
                    <Text>
                      Sạc đã được đặt trước, vui lòng chọn loại sạc khác
                    </Text>
                  </>
                )}
              </>
            )}
            {types.status === "S3" && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    {" "}
                    Chữ điện bắt đầu: {hiss?.number_start}
                  </Text>
                </View>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    {" "}
                    Chữ điện hiện tại: {energy}
                  </Text>
                </View>

                {hiss?.user_id === userInfo?.id ? (
                  <>
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionTitle}>
                        Thời gian bắt đầu:{" "}
                        {hiss?.start_time
                          ? new Date(hiss.start_time).toLocaleTimeString()
                          : ""}
                      </Text>
                    </View>
                    <View></View>
                    <TouchableOpacity
                      style={styles.bookButton}
                      // onPress={startCharging}
                    >
                      <Text style={styles.bookText}>Tạm dừng sạc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.bookButton}
                      onPress={async () => {
                        await router.push({
                          pathname: "/TypeScreen",
                          params: { type_id: type_id },
                        });
                        const startTime = hiss?.start_time
                          ? new Date(hiss.start_time).toLocaleString()
                          : "Không có";
                        const endTime = new Date().toLocaleString();
                        const chuDien = parseFloat(
                          (
                            Number(energy ?? 0) -
                            Number(hiss?.number_start ?? 0)
                          ).toFixed(2)
                        );
                        const tien =
                          Number(types?.default_price ?? 0) * chuDien;

                        Alert.alert(
                          "Xác nhận",
                          "Bạn có muốn hoàn tất sạc?\n" +
                            `Thời gian bắt đầu:${startTime}\n` +
                            `Thời gian kết thúc:${endTime}\n` +
                            `Tổng chữ điện: ${energy} - ${hiss?.number_start} = ${chuDien}\n` +
                            `Tổng tiền: ${tien.toLocaleString("vi-VN")} VND`,
                          [
                            { text: "Huỷ", style: "cancel" },
                            {
                              text: "Hoàn Tất Sạc",
                              onPress: async () => {
                                await endCharging(); // Tạo thông báo
                                await done(); // Tạo thông báo
                                router.push({
                                  pathname: "/TypeScreen",
                                  params: { type_id: type_id },
                                });
                              },
                            },
                          ],
                          { cancelable: true }
                        );
                        // endCharging();
                        // done();
                        // router.push({
                        //   pathname: "/TypeScreen",
                        //   params: { type_id: type_id },
                        // });
                      }}
                    >
                      <Text style={styles.bookText}>Hoàn tất sạc</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <Text>Sạc đang được sạc, vui lòng chọn loại sạc khác</Text>
                )}
              </>
            )}
            {types.status === "S4" && (
              <>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>
                    {" "}
                    Chữ điện: {energy}
                  </Text>
                </View>
                {messages !== "" && (
                  <View>
                    <Text style={[styles.label, { color: "red" }]}>
                      {" "}
                      {messages}
                    </Text>
                  </View>
                )}
                <TextInput
                  placeholder="Ghi chú"
                  style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
                  value={bookingData.note}
                  onChangeText={(text) =>
                    setBookingData({ ...bookingData, note: text })
                  }
                />
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={async () => {
                    try {
                      // await createReservation(); // Đợi tạo xong
                      const message = await createReservation();
                      if (
                        message ===
                        "Bạn đã có một lịch đặt hoặc phiên sạc chưa hoàn thành."
                      ) {
                        return; // Dừng ở đây, không gọi book hoặc chuyển trang
                      }
                      Alert.alert(
                        "Xác nhận",
                        "Bạn có muốn đặc lịch sạc?",
                        [
                          { text: "Huỷ", style: "cancel" },
                          {
                            text: "Đặc Lịch Sạc",
                            onPress: async () => {
                              await book(); // Tạo thông báo
                              router.push({
                                pathname: "/TypeScreen",
                                params: { type_id: type_id },
                              });
                            },
                          },
                        ],
                        { cancelable: true }
                      );
                      // await book(); // Tạo thông báo
                      // router.push({
                      //   pathname: "/TypeScreen",
                      //   params: { type_id: type_id },
                      // });
                    } catch (error) {
                      console.error("Tạo đặt chỗ thất bại:", error);
                      // Có thể hiện thông báo lỗi ở đây
                    }
                  }}
                >
                  <Text style={styles.bookText}>Đặt Lịch Sạc</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        )}
        {/* Search Bar */}
        {/* </ScrollView> */}
      </SafeAreaView>
      <View style={styles.footer}>
        <BottomNav />
      </View>
    </View>
  );
};

export default TypeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fefefe" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  searchInput: { flex: 1, height: 40 },
  filterIcon: { marginLeft: 8 },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 16 },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  activeTab: {
    backgroundColor: "#00bcd4",
  },
  tabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#57d2d2",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  stationCard: {
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  stationTitle: { fontSize: 13, fontWeight: "bold" },
  stationSubtitle: { fontSize: 12, color: "#333" },
  detailText: { color: "#007AFF", fontSize: 12 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  bookButton: {
    backgroundColor: "#7cd2cf",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  bookText: { color: "#fff", fontWeight: "bold" },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 12,
  },
});
