import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Theme } from '../theme';

interface Pharmacy {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  available: boolean;
}

interface MapComponentProps {
  pharmacies: Pharmacy[];
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const MapComponent = ({ pharmacies, initialRegion }: MapComponentProps) => {
  // Use a simple OpenStreetMap iframe for web
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${initialRegion.longitude - 0.01}%2C${initialRegion.latitude - 0.01}%2C${initialRegion.longitude + 0.01}%2C${initialRegion.latitude + 0.01}&layer=mapnik&marker=${initialRegion.latitude}%2C${initialRegion.longitude}`;

  return (
    <View style={styles.container}>
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={mapUrl}
        style={{ border: 0 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    opacity: 0.4,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  text: {
    ...Theme.typography.body,
    fontWeight: '700',
    color: '#333',
  },
  subtext: {
    ...Theme.typography.bodySmall,
    color: '#666',
    marginTop: 4,
  },
});

export default MapComponent;
