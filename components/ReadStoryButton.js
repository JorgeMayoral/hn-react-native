import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

const ReadStoryButton = ({ url }) => {
  const handleOpen = () => {
    WebBrowser.openBrowserAsync(url);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleOpen}>
      <Text style={styles.buttonText}>Read Story</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 0,
    marginVertical: 20,
    borderRadius: 100,
    textAlign: 'center',
    backgroundColor: '#00adb5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    maxWidth: 180,
    elevation: 5, // Android only
  },
  buttonText: {
    color: '#fff',
  },
});

export default ReadStoryButton;
