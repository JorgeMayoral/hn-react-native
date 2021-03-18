import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HTMLView from 'react-native-htmlview';

const EntryCard = ({ data }) => {
  const time = new Date(data?.time * 1000);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.timeAgo}>{time.toLocaleDateString('en-GB')}</Text>
        <Text style={styles.author}>By: {data?.by}</Text>
        <HTMLView value={data?.text} />
        <View style={styles.entryFooter}>
          <Text>
            {data?.kids?.length ? data.kids?.length.toString() : '0'} responses
          </Text>
        </View>
      </View>
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
    marginTop: 15,
    marginLeft: 'auto',
  },
  timeAgo: {
    fontSize: 10,
    color: 'gray',
    marginLeft: 'auto',
  },
  author: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default EntryCard;
