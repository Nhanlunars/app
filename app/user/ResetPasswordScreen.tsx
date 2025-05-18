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

const ResetPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);

  const handleResetPassword = () => {
    // Logic reset password
    alert("Mật khẩu đã được tạo lại thành công!");
    navigation.navigate("Login"); // hoặc trang chính
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
        <Text style={styles.label}>Nhập Lại Mật Khẩu</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="nhập lại mật khẩu của bạn"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Icon
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#333"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Tạo Mật khẩu mới</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#B5F3F8",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    fontSize: 14,
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