/**
 * UserLocationContext.jsx
 * This context provides the user's current location using the Geolocation API.
 * It initializes the location state and updates it when the component mounts.
 * The location is stored in a context that can be accessed by any component in the application.
 * 
 * @component
 * @example
 * <UserLocationProvider>
 *  <YourComponent />
 * </UserLocationProvider>
 * @returns {JSX.Element} The rendered UserLocationProvider component.
 * @returns {Object} The context value containing userLocation and setUserLocation.
 * @returns {Function} useUserLocation - A custom hook to access the user location context
 */
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