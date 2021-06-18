# @roshangm1/react-native-header-scrollview

Library for big header like ios with Typescript support

## Installation

**_To use with Animated from react native, use <= 0.4.0_**

```sh
yarn add @roshangm1/react-native-header-scrollview@0.4.0

```

**_To use with `react-native-reanimated@v2`, use >0.4.0 (latest)_**

Make sure that you have installed [React Native Reanimated V2](https://docs.swmansion.com/react-native-reanimated/docs/installation) properly.

```sh
yarn add @roshangm1/react-native-header-scrollview
```

## Usage

### Scrollview

```js
import HeaderScrollview from '@roshangm1/react-native-header-scrollview';

// ...

return <HeaderScrollview title="Hello">content...</HeaderScrollview>;
```

### Flatlist

```json
  const data = [
    { id: 'header' }, // first index act as a header so always prepend extra item to your data
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

return (
  <HeaderScrollview
    title="Hellow world"
    useFlatlist={true}
    flatListProps={{
      data: data,
      keyExtractor: (item) => item.id.toString(),
    }}
    ....
  />
);
```

Please check [example](https://github.com/roshangm1/react-native-header-scrollview/tree/main/example) for implementation detail.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
