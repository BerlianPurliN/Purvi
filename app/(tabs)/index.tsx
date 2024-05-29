import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, TextInput, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PlaceItem from '../../placeitem/PlaceItem';

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
  PlaceList: undefined;
  PlaceDetails: { place: Place };
};

type PlaceListNavigationProp = StackNavigationProp<RootStackParamList, 'PlaceList'>;

const PlaceList: React.FC = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<PlaceListNavigationProp>();

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const response = await fetch('https://dewalaravel.com/api/places');
      const data = await response.json();
      setPlaces(data.data);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePlacePress = (place: Place) => {
    navigation.navigate('PlaceDetails', { place });
  };

  const filteredPlaces = places.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search places..."
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePlacePress(item)}>
            <PlaceItem place={item} />
          </TouchableOpacity>
        )}
      />
      </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    padding: 20,  // Padding opsional untuk memberikan ruang di sekitar konten
  },
  searchBar: {
    height: 100,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1.8,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 8,
  },
  searchInput: {
    height: 58,  // Tinggi kotak panjang
    backgroundColor: '#ffffff',  // Background putih untuk TextInput
    borderColor: '#D2D2D2',  // Warna border (hitam)
    borderWidth: 1,  // Lebar border
    borderRadius: 28,  // Radius sudut untuk membuat border melengkung
    paddingHorizontal: 25,  // Padding horizontal di dalam TextInput
    marginHorizontal: 30,
  },
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

export default PlaceList;