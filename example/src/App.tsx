import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import HeaderScrollview from 'react-native-header-scrollview';

export default function App() {
  const data = [
    { id: 'header' },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];
  const renderItem = ({ item }) => {
    return (
      <View key={item.id} style={styles.box}>
        <Text>{item.id}</Text>
      </View>
    );
  };
  // return (
  //   <HeaderScrollview
  //     title="Hellow"
  //     useFlatlist={true}
  //     flatListProps={{
  //       data,
  //       keyExtractor: (item) => item.id.toString(),
  //     }}
  //     renderItem={renderItem}
  //   />
  // );

  return (
    <HeaderScrollview title="Hello">
      {data.map((item, index) => {
        if (index === 0) {
          return null;
        }
        return renderItem({ item });
      })}
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
