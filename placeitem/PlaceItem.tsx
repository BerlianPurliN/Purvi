import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

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
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  placeImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  placeDetails: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  placeCategory: {
    fontSize: 16,
    color: '#888',
  },
});

export default PlaceItem;