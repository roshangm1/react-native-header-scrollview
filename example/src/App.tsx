import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import HeaderScrollview from 'react-native-header-scrollview';

export default function App() {
  return (
    <HeaderScrollview title="Hellow">
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
      <View style={styles.box}>
        <Text>Items</Text>
      </View>
    </HeaderScrollview>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
});
