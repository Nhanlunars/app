// MapLocation.tsx
import MapLocation from "./MapLocation.native";
export default MapLocation;
// import MapLocation from "./MapLocation.web";
// export default MapLocation;
// import { Platform } from "react-native";

// const MapLocation =
//   Platform.OS === "web"
//     ? require("./MapLocation.web").default
//     : require("./MapLocation.native").default;
// export default MapLocation;

// import { Platform } from "react-native";
// import React, { lazy, Suspense } from "react";

// const MapLocation = lazy(() =>
//   Platform.OS === "web"
//     ? import("./MapLocation.web")
//     : import("./MapLocation.native")
// );
// // const MapLocation = Platform.OS === "web"
// //   ? lazy(() => import("./MapLocation.web"))
// //   : lazy(() => import("./MapLocation.native"));

// export default function MapLocationWrapper() {
//   return (
//     <Suspense fallback={null}>
//       <MapLocation />
//     </Suspense>
//   );
// }
