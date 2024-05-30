import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PlaceItem from './PlaceItem';

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
        placeholderTextColor="#888"
      />
      <FlatList
        data={filteredPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePlacePress(item)}>
            <PlaceItem place={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
    padding: 20,
  },
  searchBar: {
    height: 50,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 1.8,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  listContent: {
    paddingHorizontal: 16,
  },
});

export default PlaceList;
