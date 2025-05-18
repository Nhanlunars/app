/*import React, { useState } from "react";
import {
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const VerifyOTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState("");

  const handleVerifyOTP = () => {
    // Logic kiểm tra OTP ở đây
    alert(`OTP bạn đã nhập: ${otp}`);
    // Ví dụ: nếu đúng -> navigation.navigate("ResetPassword")
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4999A2" barStyle="light-content" />

      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Icon name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Quên Mật Khẩu</Text>
      </View>

     
      <View style={styles.body}>
        <Text style={styles.label}>Nhập OTP</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    backgroundColor: "#4999A2",
    height: 140,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backIcon: {
    marginRight: 12,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#072541",
  },
  body: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 15,
    color: "#333",
  },
  input: {
    backgroundColor: "#B5F3F8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#4999A2",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C6724B",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});*/