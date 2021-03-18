import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Button } from 'react-native';
import EntryCard from '../components/EntryCard';
import LoadingComponent from '../components/LoadingComponent';
import fetchNewsIds from '../services/fetchNewsIds';
import fetchStory from '../services/fetchStory';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [lastStory, setLastStory] = useState(0);
  const [allIds, setAllIds] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);

  const getNews = async () => {
    setMoreLoading(true);
    const storiesIds = await fetchNewsIds();
    setAllIds(storiesIds);
    const fetchedStories = [];
    for (let i = lastStory; i < lastStory + 10; i++) {
      const data = await fetchStory(allIds[i]);
      fetchedStories.push(data);
    }
    setNews([...news, ...fetchedStories]);
    setLastStory((prev) => prev + 10);
    setLoading(false);
    setMoreLoading(false);
  };

  const LoadMore = () => {
    return (
      <Button
        onPress={getNews}
        title={moreLoading ? 'Loading...' : 'Load more'}
        disabled={moreLoading}
      />
    );
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
          keyExtractor={(item) => item?.id.toString()}
          ListFooterComponent={lastStory < 500 ? <LoadMore /> : null}
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
