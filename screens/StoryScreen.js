import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import LoadingComponent from '../components/LoadingComponent';
import { FlatList } from 'react-native-gesture-handler';

const StoryScreen = ({ route }) => {
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);
  const { storyId } = route.params;

  const fetchStory = async () => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
    );
    const data = await response.json();
    setStory(data);
  };

  const handleOpen = () => {
    WebBrowser.openBrowserAsync(story.url);
  };

  useEffect(() => {
    setLoading(true);
    fetchStory();
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{story?.title}</Text>
        <View>
          <Text>By: {story.by}</Text>
          <Text style={styles.stats}>
            {story?.score ? story.score.toString() : '0'} points
          </Text>
          <Text style={styles.stats}>
            {story?.kids?.length ? story.kids?.length.toString() : '0'} comments
          </Text>
        </View>
        <View>
          <Text>Comments</Text>
        </View>
      </View>
      <Button
        title="Read Story"
        onPress={handleOpen}
        style={styles.readButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    height: '100%',
    display: 'flex',
  },
  content: {
    flex: 1,
  },
  readButton: {
    bottom: 0,
    marginHorizontal: 0,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 25,
  },
  stats: {
    textAlign: 'right',
  },
});

export default StoryScreen;
