import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import EntryCard from '../components/EntryCard';
import LoadingComponent from '../components/LoadingComponent';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);

  const getNews = async () => {
    const API_URL = 'https://hacker-news.firebaseio.com/v0';
    const idsResponse = await fetch(`${API_URL}/beststories.json`);
    const allIds = await idsResponse.json();
    const allStories = [];
    for (let id of allIds) {
      const response = await fetch(`${API_URL}/item/${id}.json`);
      const data = await response.json();
      allStories.push(data);
    }
    setNews(allStories);
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
