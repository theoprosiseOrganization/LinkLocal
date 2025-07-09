import React from 'react';
import { ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps';

import { DrawingManager } from './DrawingManager';
import { UndoRedoControl } from './undo-redo-control';
import ControlPanel from './control-panel';

const DrawingExample = () => {
  // If you need to access the DrawingManager instance, you can use a ref or state.
  // For now, we'll just render it to enable drawing on the map.

  return (
    <>
      <Map
        defaultZoom={3}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {/* DrawingManager must be a child of Map to access the map context */}
        <DrawingManager />
      </Map>

      <ControlPanel />

      <MapControl position={ControlPosition.TOP_CENTER}>
        {/* If UndoRedoControl needs the drawingManager, 
            you can lift state up and pass it down as a prop */}
        <UndoRedoControl />
      </MapControl>
    </>
  );
};

export default DrawingExample;