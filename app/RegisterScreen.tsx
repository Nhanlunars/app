// app/screens/RegisterScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
  const router = useRouter();

const [form, setForm] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  address: '',
  gender: '',
});

const handleChange = (key: string, value: string) => {
  setForm({ ...form, [key]: value });
};

/*const handleRegister = async () => {
  try {
    const result = await registerUser(form);
    Alert.alert('Thành công', 'Tài khoản đã được tạo!');
    navigation.navigate('Login');
  } catch (err: any) {
    Alert.alert('Lỗi', err.message || 'Đăng ký thất bại');
  }
};*/

type RootStackParamList = {
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
    const router = useRouter();
  //const navigation = useNavigation<NavigationProp>();
  const [securePassword, setSecurePassword] = useState(true);
  const [secureAddress, setSecureAddress] = useState(false);
const Login = () => {
   // router.push('/LoginScreen'); // hoặc '/user/home' tùy vào đường dẫn bạn tạo
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
            <TextInput
  value={form.lastName}
  onChangeText={(text) => handleChange('lastName', text)}
              placeholder="nhập tên của bạn"
              placeholderTextColor="#333"
            />
          </View>
          <View style={styles.halfInputContainer}>
            <Text style={styles.label}>Họ</Text>
            <TextInput
  value={form.firstName}
  onChangeText={(text) => handleChange('firstName', text)}
              placeholder="nhập họ của bạn"
              placeholderTextColor="#333"
            />
          </View>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
  value={form.email}
  onChangeText={(text) => handleChange('email', text)}
          placeholder="nhập  email của bạn"
          placeholderTextColor="#333"
        />

        <Text style={styles.label}>Số điện Thoại</Text>
        <TextInput
  value={form.phone}
  onChangeText={(text) => handleChange('phone', text)}
          placeholder="nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          placeholderTextColor="#333"
        />

        <Text style={styles.label}>Mật Khẩu</Text>
        <View style={styles.passwordContainer}>
          <TextInput
  value={form.password}
  onChangeText={(text) => handleChange('password', text)}
            placeholder="nhập mật khẩu"
            secureTextEntry={securePassword}
            placeholderTextColor="#333"
          />
          <TouchableOpacity onPress={() => setSecurePassword(!securePassword)}>
            <Ionicons
              name={securePassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#333"
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Địa chỉ</Text>
        <View style={styles.passwordContainer}>
          <TextInput
  value={form.address}
  onChangeText={(text) => handleChange('address', text)}
            placeholder="nhập địa chỉ của bạn"
            secureTextEntry={secureAddress}
            placeholderTextColor="#333"
          />
          <TouchableOpacity onPress={() => setSecureAddress(!secureAddress)}>
            <Ionicons
              name={secureAddress ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#333"
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Giới tính</Text>
        <TextInput
  value={form.gender}
  onChangeText={(text) => handleChange('gender', text)}
          placeholder="Nam / Nữ / Khác"
          placeholderTextColor="#333"
        />

        <TouchableOpacity style={styles.registerButton} /*onPress={handleRegister}*/>
  <Text style={styles.registerButtonText}>Đăng Ký</Text>
</TouchableOpacity>

        <Pressable>
          <Text style={styles.loginText}>
            Bạn đã có tài khoản? <Text style={{ fontWeight: '600' }}  onPress={() => router.push('/LoginScreen')}>Đăng Nhập</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#4AA7A0',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  form: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInputContainer: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#B1F3FB',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B1F3FB',
    borderRadius: 12,
    marginBottom: 4,
  },
  registerButton: {
    backgroundColor: '#4AA7A0',
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 24,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  loginText: {
    fontSize: 13,
    color: '#333',
    marginTop: 20,
    textAlign: 'center',
  },
});
