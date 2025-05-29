import axios from "@/axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

type Location = {
  id: string;
  lat: number;
  lng: number;
  location_name: string;
  address: string;
};

// Fix icon mặc định bị lỗi trong react-leaflet v3+
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Fix lỗi không load được icon mặc định trong leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const FitBounds = ({ locations }: { locations: Location[] }) => {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
};

const MapLocation = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/api/get-all-location?id=All`);
        setLocations(res.data.locations || []);
      } catch (error) {
        console.error("Error loading locations:", error);
      }
    };

    fetchData();
  }, []);

  if (locations.length === 0) {
    return <p>Đang tải dữ liệu bản đồ...</p>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={[locations[0].lat, locations[0].lng]}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customIcon}>
            <Popup>
              <b>{loc.location_name}</b>
              <br />
              {loc.address}
            </Popup>
          </Marker>
        ))}
        <FitBounds locations={locations} />
      </MapContainer>
    </div>
  );
};

export default MapLocation;
