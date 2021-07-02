import * as React from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import HeaderScrollview from '@roshangm1/react-native-header-scrollview';

export default function App() {
  const ref = React.useRef<FlatList<any>>();
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

  React.useEffect(() => {
    // setTimeout(() => {
    //   ref?.current?.scrollToEnd?.({ animated: true });
    // }, 1000);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          right: 16,
          top: 16,
        }}
      >
        <Text>Global settings</Text>
      </View>
      <HeaderScrollview
        flatListRef={ref}
        title="Hellow world"
        titleComponent={
          <Image
            source={{
              uri: 'http://mercurio.diagonal.services/storage//mercurio.diagonal.services/assets/logo/16244548715013_Logo.png',
            }}
            resizeMode="center"
            style={{
              width: 200,
              height: 80,
            }}
          />
        }
        useFlatlist={true}
        flatListProps={{
          data: data,
          keyExtractor: (item) => item.id.toString(),
        }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );

  // return (
  //   <SafeAreaView style={{ flex: 1 }}>
  //     <HeaderScrollview title="Hello world">
  //       {data.map((item, index) => {
  //         if (index === 0) {
  //           return null;
  //         }
  //         return renderItem({ item });
  //       })}
  //     </HeaderScrollview>
  //   </SafeAreaView>
  // );
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
