import axios from "@/axios";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");
const router = useRouter();

type Location = {
  id: string;
  lat: number;
  lng: number;
  location_name: string;
  address: string;
};

const MapLocation = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  const getLocation = async () => {
    try {
      const res = await axios.get(`/api/get-all-location?id=All`);
      setLocations(res.data.locations || []);
    } catch (error) {
      console.error("Error loading location:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (locations.length > 0 && mapRef.current) {
      const coordinates = locations.map((loc) => ({
        latitude: loc.lat,
        longitude: loc.lng,
      }));
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [locations]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (locations.length === 0) {
    return (
      <View style={styles.center}>
        <Text> No locations available </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: locations[0].lat,
          longitude: locations[0].lng,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{ latitude: loc.lat, longitude: loc.lng }}
            // title={loc.location_name}
            // description={loc.address}
            // image={require("@/assets/images/684908.png")} // hoặc bỏ nếu không có icon
          >
            <Image
              source={require("@/assets/images/684908.png")}
              style={{ width: 20, height: 20 }} // tùy chỉnh kích thước nhỏ hơn
              resizeMode="contain"
            />
            {/* <Callout>
              <View style={{ width: 200 }}>
                <Text style={{ fontWeight: "bold" }}>{loc.location_name}</Text>
                <Text>{loc.address}</Text>
                <TouchableOpacity
                  style={{
                    marginTop: 8,
                    backgroundColor: "#007AFF",
                    paddingVertical: 6,
                    borderRadius: 4,
                    alignItems: "center",
                  }}
                  onPress={() =>
                    router.push({
                      pathname: "/LocationScreen",
                      params: { location_id: loc.id },
                    })
                  }
                >
                  <Text style={{ color: "#fff" }}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            </Callout> */}
            <Callout
              tooltip={false}
              onPress={() => {
                router.push({
                  pathname: "/LocationScreen",
                  params: { location_id: loc.id },
                });
              }}
            >
              <View style={{ width: 200 }}>
                <Text style={{ fontWeight: "bold", marginBottom: 4 }}>
                  {loc.location_name}
                </Text>
                <Text numberOfLines={2}>{loc.address}</Text>
                <View
                  style={{
                    marginTop: 8,
                    backgroundColor: "#007AFF",
                    paddingVertical: 6,
                    borderRadius: 4,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#fff" }}>Xem chi tiết</Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapLocation;
