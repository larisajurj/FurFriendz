import React, { useEffect, useState, useRef } from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';

export const DoublePressMarker = ({ coordinate, onSinglePress, onDoublePress, title, description, image }) => {
  const lastPress = useRef(null);
  const doublePressDelay = 3000; // Double press threshold in milliseconds

  const handlePress = () => {
    const now = Date.now();
    console.log(lastPress);
    console.log(now);
    console.log(now - lastPress.current);
    if (lastPress.current != null && (now - lastPress.current < doublePressDelay)) {
      // Double press detected
      if (onDoublePress) onDoublePress();
    } else {
      // Single press detected
      if (onSinglePress) onSinglePress();
    }

    lastPress.current = now;
  };

  return (
    <Marker
      coordinate={coordinate}
      title={title}
      description={description}
      image={image}
      onPress={handlePress} // Attach the double-press detection to the onPress handler
    />
  );
};
