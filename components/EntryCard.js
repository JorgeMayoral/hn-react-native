import React from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';

const EntryCard = ({ data, callback }) => {
  const time = new Date(data?.time * 1000);

  return (
    // TouchableNativeFeedback only works on Android
    <TouchableNativeFeedback onPress={() => callback()}>
      <View style={styles.container}>
        <View>
          <Text style={styles.timeAgo}>{time.toLocaleDateString('en-GB')}</Text>
          <Text style={styles.title}>{data?.title}</Text>
          <View style={styles.entryFooter}>
            <Text>{data?.score || 0} points</Text>
            <Text>{data?.kids.length} comments</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
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
