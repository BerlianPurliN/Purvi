import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface NavBarProps extends TextInputProps {
  searchValue: string;
  onSearchChange: (text: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ searchValue, onSearchChange, category, onCategoryChange, ...props }) => {
  return (
    <View style={styles.navbar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchValue}
        onChangeText={onSearchChange}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    backgroundColor: '#6200EE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  picker: {
    height: 40,
    width: 150,
  },
});

export default NavBar;
