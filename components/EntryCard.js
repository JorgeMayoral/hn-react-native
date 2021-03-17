import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const EntryCard = ({ data, callback }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.timeAgo}>{data.time_ago}</Text>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.entryFooter}>
        <Text>{data.points || 0} points</Text>
        <Text>{data.comments_count} comments</Text>
      </View>
      <Button onPress={() => callback(data.id)} title="See" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    marginBottom: 10,
    padding: 10,
  },
  entryFooter: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeAgo: {
    fontSize: 10,
    color: 'gray',
    marginLeft: 'auto',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default EntryCard;
