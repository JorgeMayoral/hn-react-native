import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EntryCard from '../components/EntryCard';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState(null);

  const getNews = async () => {
    const API_URL = 'https://api.hackerwebapp.com/news';
    const response = await fetch(API_URL);
    const data = await response.json();
    setNews(data);
    setLoading(false);
  };

  const renderItem = ({ item }) => <EntryCard data={item} />;

  useEffect(() => {
    getNews();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {news && (
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    paddingTop: 10,
    fontSize: 20,
  },
});

export default HomeScreen;
