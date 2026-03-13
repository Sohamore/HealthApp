import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';

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
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={initialRegion}
    >
      {pharmacies.map((pharmacy) => (
        <Marker
          key={pharmacy.id}
          coordinate={{ latitude: pharmacy.latitude, longitude: pharmacy.longitude }}
          title={pharmacy.name}
          description={pharmacy.available ? 'In Stock' : 'Out of Stock'}
          pinColor={pharmacy.available ? '#2e7d32' : '#c62828'}
        >
          <Callout>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutTitle}>{pharmacy.name}</Text>
              <Text style={[styles.calloutStatus, { color: pharmacy.available ? '#2e7d32' : '#c62828' }]}>
                {pharmacy.available ? '● Available' : '● Out of Stock'}
              </Text>
            </View>
          </Callout>
        </Marker>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    padding: 8,
    minWidth: 150,
  },
  calloutTitle: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
  },
  calloutStatus: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default MapComponent;
