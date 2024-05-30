import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface Place {
  id: number;
  name: string;
  slug: string;
  photo: string;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
}

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => (
  <View style={styles.placeItem}>
    <Image source={{ uri: place.photo }} style={styles.placeImage} />
    <View style={styles.placeDetails}>
      <Text style={styles.placeName}>{place.name}</Text>
      <Text style={styles.placeCategory}>{place.category.name}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  placeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 16,
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  placeCategory: {
    fontSize: 16,
    color: '#888',
  },
});

export default PlaceItem;
