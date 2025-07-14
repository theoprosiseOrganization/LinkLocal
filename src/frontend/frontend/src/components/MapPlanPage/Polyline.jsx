import {useMap, useMapsLibrary} from "@vis.gl/react-google-maps";
import { set } from "date-fns";
import React, {use, useEffect, useState} from "react";

export default function Polyline({encodedPath, strokeWeight = 3, strokeColor = "#0074D9"}) {
  const map = useMap();
  const maps = useMapsLibrary('maps');
  const geom = useMapsLibrary('geometry');
  const [poly, setPoly] = useState(null);


  useEffect(() => {
   if( maps && map){
    const polyline = new maps.Polyline({maps, strokeWeight, strokeColor});
    setPoly(polyline);
    return () => polyline.setMap(null);
   }
}, [maps, map]);
useEffect(() => {
    if (poly  && geom && encodedPath) {
      const path = geom.encoding.decodePath(encodedPath);
      poly.setPath(path);
    }
  }, [poly, geom, encodedPath]);

  // Update polyline options when strokeWeight or strokeColor changes
useEffect(() => {
    if(poly ){
        poly.setOptions({strokeWeight, strokeColor});
    }
}, [poly, strokeWeight, strokeColor]);

return null;
}