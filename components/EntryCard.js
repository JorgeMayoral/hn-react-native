import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native';

const EntryCard = ({ data, callback }) => {
  return (
    <TouchableNativeFeedback onPress={() => callback(data.id)}>
      <View style={styles.container}>
        <View>
          <Text style={styles.timeAgo}>{data.time}</Text>
          <Text style={styles.title}>{data.title}</Text>
          <View style={styles.entryFooter}>
            <Text>{data.score || 0} points</Text>
            <Text>{data.kids.length} comments</Text>
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
