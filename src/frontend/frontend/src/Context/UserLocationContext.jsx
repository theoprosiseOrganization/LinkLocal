import React, { createContext, useContext, useState, useEffect } from "react";

const UserLocationContext = createContext();

export function UserLocationProvider({ children }) {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => setUserLocation(null)
      );
    }
  }, []);

  return (
    <UserLocationContext.Provider value={{ userLocation, setUserLocation }}>
      {children}
    </UserLocationContext.Provider>
  );
}

export function useUserLocation() {
  return useContext(UserLocationContext);
}