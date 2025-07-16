import { useState } from "react";
import { useUserLocation } from "../../Context/UserLocationContext";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

export default function UserLocationMarker() {
  const { userLocation } = useUserLocation();
  const [hovered, setHovered] = useState(false);

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
            position: "relative",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
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
          {hovered && (
            <span
              style={{
                position: "absolute",
                top: -30,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#222",
                color: "#fff",
                padding: "2px 8px",
                borderRadius: 4,
                fontSize: 12,
                whiteSpace: "nowrap",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              Your Location
            </span>
          )}
        </div>
      </AdvancedMarker>
    )
  );
}