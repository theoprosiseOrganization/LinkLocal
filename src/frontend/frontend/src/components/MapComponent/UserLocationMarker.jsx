import { useUserLocation } from "../../Context/UserLocationContext";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

export default function UserLocationMarker() {
  const { userLocation } = useUserLocation();

  return (
    userLocation && (
      <AdvancedMarker
        position={userLocation}
        advancedMarkerProps={{
          title: "Your Location",
        }}
      >
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "rgba(0, 123, 255, 0.7)",
            border: "2px solid #fff",
            boxShadow: "0 0 6px #007bff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#fff",
              display: "block",
            }}
          />
        </div>
      </AdvancedMarker>
    )
  );
}