import React, {useRef, useEffect, useState, useCallback} from "react";
import{
    APIProvider, Map, AdvancedMarker,
} from "@vis.gl/react-google-maps";

const MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export default function MapComponent({events = [], currentLocation}) {
    const mapRef = useRef(null);
    const drawingManagerRef = useRef(null);
    const [markers, setMarkers] = useState(events);
    <>Map</>

}