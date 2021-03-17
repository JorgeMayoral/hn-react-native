import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import EntryCard from '../components/EntryCard';
import LoadingComponent from '../components/LoadingComponent';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState(null);

  const getNews = async () => {
    const API_URL = 'https://api.hackerwebapp.com/news';
    const response = await fetch(API_URL);
    const data = await response.json();
    setNews(data);
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <EntryCard
      data={item}
      callback={(id) => navigation.navigate('Story', { storyId: id })}
    />
  );

  useEffect(() => {
    getNews();
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
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
