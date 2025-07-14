/**
 * Polyline component for rendering a Google Maps Polyline
 * using the @vis.gl/react-google-maps library.
 * It decodes an encoded path and sets the polyline options such as stroke weight and color.
 * The component listens for changes in the encoded path, stroke weight, and stroke color
 * and updates the polyline accordingly.
 *
 *  @component
 *  @param {Object} props - The properties passed to the component.
 *  @param {string} props.encodedPath - The encoded path for the polyline.
 *  @param {number} [props.strokeWeight=3] - The stroke weight of the polyline.
 *  @param {string} [props.strokeColor="#0074D9"] - The stroke color of the polyline.
 *  @returns {null} The component does not render any visible elements, it only manages the polyline on the map.
 */
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import React, { use, useEffect, useState } from "react";

export default function Polyline({
  encodedPath,
  strokeWeight = 3,
  strokeColor = "#0074D9",
}) {
  const map = useMap();
  const maps = useMapsLibrary("maps");
  const geom = useMapsLibrary("geometry");
  const [poly, setPoly] = useState(null);

  useEffect(() => {
    if (maps && map) {
      const polyline = new maps.Polyline({ map, strokeWeight, strokeColor });
      setPoly(polyline);
      return () => polyline.setMap(null);
    }
  }, [maps, map]);
  useEffect(() => {
    if (poly && geom && encodedPath) {
      const path = geom.encoding.decodePath(encodedPath);
      poly.setPath(path);
    }
  }, [poly, geom, encodedPath]);

  // Update polyline options when strokeWeight or strokeColor changes
  useEffect(() => {
    if (poly) {
      poly.setOptions({ strokeWeight, strokeColor });
    }
  }, [poly, strokeWeight, strokeColor]);

  return null;
}
