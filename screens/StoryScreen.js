import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import LoadingComponent from '../components/LoadingComponent';
import { FlatList } from 'react-native-gesture-handler';
import fetchItem from '../services/fetchItem';
import CommentCard from '../components/CommentCard';
import Separator from '../components/Separator';
import ReadStoryButton from '../components/ReadStoryButton';

const StoryScreen = ({ route }) => {
  const [story, setStory] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [lastComment, setLastComment] = useState(0);
  const [moreLoading, setMoreLoading] = useState(false);
  const { item } = route.params;

  const time = new Date(story?.time * 1000).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const getComments = async () => {
    setMoreLoading(true);
    const fetchedComments = [];
    for (let i = lastComment; i < lastComment + 10; i++) {
      const data = await fetchItem(story.kids[i]);
      fetchedComments.push(data);
    }
    setLastComment((prev) => prev + 10);
    setComments([...comments, ...fetchedComments]);
    setMoreLoading(false);
  };

  const renderItem = ({ item }) => {
    return <CommentCard data={item} />;
  };

  useEffect(() => {
    setLoading(true);
    if (story.kids) {
      setCommentsLoading(true);
      getComments();
      setCommentsLoading(false);
    }
    setStory(item);
    setLoading(false);
  }, [story]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{story?.title}</Text>
        <View style={styles.column}>
          <Text>By: {story.by}</Text>
          <Text>{story?.score ? story.score.toString() : '0'} points</Text>
        </View>
        <View style={styles.column}>
          <Text>{time}</Text>
          <Text>
            {story?.kids?.length ? story.kids?.length.toString() : '0'} comments
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {story?.url && (
            <ReadStoryButton
              title="Read Story"
              url={story.url}
              style={styles.readButton}
            />
          )}
          <Separator />
        </View>
        <View style={styles.commentsContainer}>
          {commentsLoading ? (
            <ActivityIndicator color="#adb05" size="large" />
          ) : (
            <FlatList
              data={comments}
              renderItem={renderItem}
              keyExtractor={(item) => item?.id.toString()}
              ItemSeparatorComponent={Separator}
              ListEmptyComponent={LoadingComponent}
              onEndReached={getComments}
              ListFooterComponent={
                moreLoading && <ActivityIndicator color="#00adb5" />
              }
            />
          )}
        </View>
      </View>
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
  buttonContainer: {
    alignItems: 'center',
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom: 25,
  },
  commentsContainer: {
    flex: 1,
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default StoryScreen;
