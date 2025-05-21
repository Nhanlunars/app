// app/screens/RegisterScreen.tsx
import axios from "@/axios";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const router = useRouter();

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
  const router = useRouter();
  //const navigation = useNavigation<NavigationProp>();
  const [securePassword, setSecurePassword] = useState(true);
  const [secureAddress, setSecureAddress] = useState(false);
  const [errMessage, setErrMassage] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    gender: "",
    roleId: "R2",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };
  const Register = async () => {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      gender,
      roleId,
    } = form;
    if (!firstName || !lastName || !email || !password) {
      Alert.alert("Vui lòng nhập họ, tên, email, mật khẩu");
      setErrMassage("Vui lòng nhập họ, tên, email, mật khẩu");

      return;
    }

    try {
      //http://172.30.192.1:8080
      const data = await axios.post("/api/create-new-user", {
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        gender,
        roleId,
      });
      console.log(form);
      if (data.data && data.data.errCode == 0) {
        // Alert.alert(data.data.message);
        console.log("dung1", data.data.errMessage);

        // navigation.navigate('Register');
        // router.push("/HomeScreen");
      } else {
        //alert("Lỗi, " + data.data.message + " Đăng nhập thất bại");
        console.log("loi1", data.data.errMessage);
        setErrMassage(data.data.errMessage);

        // Alert.alert(data.data.errMessage);
      }
    } catch (e) {
      console.log("loge", e);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity> */}
        <Text style={styles.headerText}>Đăng Ký</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Tên</Text>
            <View style={styles.halfContainer}>
              <TextInput
                value={form.lastName}
                onChangeText={(text) => handleChange("lastName", text)}
                placeholder=" nhập tên của bạn"
                placeholderTextColor="#333"
                style={{ width: "100%" }}
              />{" "}
            </View>
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Họ</Text>
            <View style={styles.halfContainer}>
              <TextInput
                value={form.firstName}
                onChangeText={(text) => handleChange("firstName", text)}
                placeholder=" nhập họ của bạn"
                placeholderTextColor="#333"
                style={{ width: "100%" }}
              />
            </View>
          </View>
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.fullContainer}>
          <TextInput
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            placeholder=" nhập  email của bạn"
            placeholderTextColor="#333"
            style={{ flex: 1, paddingRight: 10 }}
          />
        </View>

        <Text style={styles.label}>Số điện Thoại</Text>
        <View style={styles.fullContainer}>
          <TextInput
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
            placeholder=" nhập số điện thoại của bạn"
            keyboardType="phone-pad"
            placeholderTextColor="#333"
            style={{ flex: 1, paddingRight: 10 }}
          />
        </View>

        <Text style={styles.label}>Mật Khẩu</Text>
        <View style={styles.fullContainer}>
          {/* <TextInput
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            placeholder="nhập mật khẩu"
            secureTextEntry={securePassword}
            placeholderTextColor="#333"
            style={{width: '90%'}}
          />
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}
            style={{width: 10}}
            >
            <Ionicons
              name={securePassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#333"
              style={{ marginHorizontal: 0 }}
            />
          </TouchableOpacity> */}
          <TextInput
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            placeholder=" Nhập mật khẩu"
            secureTextEntry={securePassword}
            placeholderTextColor="#333"
            style={{ flex: 1, paddingRight: 35 }} // Chừa khoảng cho icon
          />
          <TouchableOpacity
            onPress={() => setSecurePassword(!securePassword)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: [{ translateY: -10 }],
            }}
          >
            <Ionicons
              name={securePassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Địa chỉ</Text>
        <View style={styles.fullContainer}>
          <TextInput
            value={form.address}
            onChangeText={(text) => handleChange("address", text)}
            placeholder=" nhập địa chỉ của bạn"
            // secureTextEntry={secureAddress}
            placeholderTextColor="#333"
            style={{ flex: 1, paddingRight: 10 }}
          />
        </View>

        <Text style={styles.label}>Giới tính</Text>
        {/* <TextInput
          value={form.gender}
          onChangeText={(text) => handleChange("gender", text)}
          placeholder="Nam / Nữ / Khác"
          placeholderTextColor="#333"
        /> */}
        <Picker
          selectedValue={form.gender}
          onValueChange={(itemValue) => handleChange("gender", itemValue)}
          style={{ color: "#000", backgroundColor: "#B1F3FB" }} // có thể tùy chỉnh style thêm nếu cần
        >
          <Picker.Item label="Chọn giới tính" value="" />
          <Picker.Item label="Nam" value="M" />
          <Picker.Item label="Nữ" value="F" />
          <Picker.Item label="Khác" value="O" />
        </Picker>
        {errMessage && (
          <View style={styles.label}>
            <Text style={[styles.label, { color: "red" }]}>{errMessage}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.registerButton} onPress={Register}>
          <Text style={styles.registerButtonText}>Đăng Ký</Text>
        </TouchableOpacity>

        <Pressable>
          <Text style={styles.loginText}>
            Bạn đã có tài khoản?{" "}
            <Text
              style={{ fontWeight: "600" }}
              onPress={() => router.push("/LoginScreen")}
            >
              Đăng Nhập
            </Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#4AA7A0",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  form: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInputContainer: {
    width: "48%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#B1F3FB",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  fullContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B1F3FB",
    borderRadius: 12,
    marginBottom: 4,
  },
  halfContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B1F3FB",
    borderRadius: 12,
    marginBottom: 4,
  },
  registerButton: {
    backgroundColor: "#4AA7A0",
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: "center",
  },
  registerButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  loginText: {
    fontSize: 13,
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
});
