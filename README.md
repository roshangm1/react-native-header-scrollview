# @roshangm1/react-native-header-scrollview

Library for big header like ios with Typescript support

## Installation

_To use with Animated from react native, use <= 0.4.0_

```sh
yarn add @roshangm1/react-native-header-scrollview@0.4.0

```

_To use with `react-native-reanimated@v2`, use >0.4.0 (latest)_

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
```

```js
return (
  <HeaderScrollview
    flatListRef={ref}
    title="Hellow world"
    useFlatlist={true}
    flatListProps={{
      data: data,
      keyExtractor: (item) => item.id.toString(),
    }}
    renderItem={renderItem}
  />
);
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
