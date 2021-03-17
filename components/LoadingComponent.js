import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingComponent;
