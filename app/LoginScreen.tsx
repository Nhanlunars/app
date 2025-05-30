// app/screens/LoginScreen.tsx
import { useAuth } from "@/app/AuthContext";
import axios from "@/axios";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const router = useRouter();
type RootStackParamList = {
  Register: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [errMessage, setErrMassage] = useState("");
  const { login } = useAuth();
  // const handleLogin = async () => {
  //   //console.log(email, password);
  //   if (!email || !password) {
  //     Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu");
  //     return;
  //   }

  //   try {
  //     const data = await axios.post("/api/login", {
  //       email,
  //       password,
  //     });

  //     //console.group(data);

  //     if (data.data && data.data.errCode == 0) {
  //       // alert(data.data.message);
  //       // navigation.navigate('Register');
  //       router.push("/HomeScreen");
  //     } else {
  //       //alert("Lỗi, " + data.data.message + " Đăng nhập thất bại");
  //       console.log("lõiooo", data.data.message);
  //       setErrMassage(data.data.message);
  //     }
  //   } catch (e) {
  //     console.log("log e", e);
  //   }
  // };
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ email và mật khẩu");
      return;
    }

    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

      const resData = response.data;
      console.log(resData);
      if (resData && resData.errCode === 0) {
        const { token, user } = resData;
        await login(token, user);
        router.replace("/HomeScreen");
      } else {
        setErrMassage(resData.message || "Đăng nhập thất bại");
      }
    } catch (e) {
      console.log("log e", e);
      setErrMassage("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Đăng Nhập</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.welcomeTitle}>Welcome</Text>
        <Text style={styles.subtitle}>
          "Public Charging Smart System – Power Up, Anytime, Anywhere!"
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email của bạn"
          placeholderTextColor="#333"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Mật Khẩu</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Nhập mật khẩu của bạn"
            placeholderTextColor="#333"
            secureTextEntry={secureText}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Ionicons
              name={secureText ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#333"
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>
        {errMessage && (
          <View style={styles.label}>
            <Text style={[styles.label, { color: "red" }]}>{errMessage}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Quên Mật Khẩu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Đăng Nhập</Text>
        </TouchableOpacity>

        <Pressable>
          <Text style={styles.registerText}>
            Bạn chưa có tài khoản?{" "}
            <Text
              onPress={() => router.push("/RegisterScreen")}
              style={{ fontWeight: "600" }}
            >
              Đăng Ký Tài Khoản
            </Text>
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#4AA7A0",
    paddingVertical: 40,
    alignItems: "center",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  headerText: {
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: "#555",
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#C1F1F8",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: "#000",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C1F1F8",
    borderRadius: 12,
    marginBottom: 6,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginVertical: 8,
  },
  forgotPasswordText: {
    fontSize: 12,
    color: "#007B83",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#4AA7A0",
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 16,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  registerText: {
    fontSize: 13,
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
});
