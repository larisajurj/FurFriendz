// app/search.js

import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: '#25292e', padding: 10 }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1c1c24',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginTop: 20,
      }}>
        <Ionicons name="search" color="#fff" size={20} />
        <TextInput
          style={{
            flex: 1,
            color: '#fff',
            marginLeft: 10,
          }}
          placeholder="Search..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {/* Optionally, add more content here */}
    </View>
  );
}
