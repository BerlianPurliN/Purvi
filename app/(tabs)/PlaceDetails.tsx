import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

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

type RootStackParamList = {
  PlaceDetails: { place: Place };
};

type PlaceDetailsRouteProp = RouteProp<RootStackParamList, 'PlaceDetails'>;

const PlaceDetails: React.FC = () => {
  const route = useRoute<PlaceDetailsRouteProp>();
  const { place } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: place.photo }} style={styles.image} />
      <Text style={styles.name}>{place.name}</Text>
      <Text style={styles.description}>{place.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
});

export default PlaceDetails;