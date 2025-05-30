import { AuthProvider, useAuth } from "@/app/AuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
//         <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
//         <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
//         <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
//         <Stack.Screen
//           name="ChargerListScreen"
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="NotificationScreen"
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="SettingScreen" options={{ headerShown: false }} />
//         <Stack.Screen
//           name="LocationListScreen"
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="LocationScreen" options={{ headerShown: false }} />
//         <Stack.Screen name="ChargerScreen" options={{ headerShown: false }} />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

// Inner content được render theo login state
function RootLayoutNav() {
  const { userToken } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { paddingTop: 25 } }}>
      {!userToken ? (
        <>
          <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
          <Stack.Screen
            name="RegisterScreen"
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="HomeScreen" options={{ headerShown: false }} />
          <Stack.Screen
            name="ChargerListScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="SettingScreen" options={{ headerShown: false }} />
          <Stack.Screen
            name="LocationListScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LocationScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="ChargerScreen" options={{ headerShown: false }} />
          <Stack.Screen
            name="MapLocation.native"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapLocation.web"
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <RootLayoutNav />
        {/* <StatusBar style="auto" /> */}
      </AuthProvider>
    </ThemeProvider>
  );
}
