# @roshangm1/react-native-header-scrollview

Header ScrollView/FlatList for react native.

## Features

- [x] Typescript
- [x] Works with Expo
- [x] Reanimated v2 (on >0.4.0)
- [x] Flatlist support (with tweaks)

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

```js
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

Please check [example](https://github.com/roshangm1/react-native-header-scrollview/tree/main/example) for implementation detail. Or you can refer to this snack here:

[Header Scrollview Example](https://snack.expo.io/@roshangm1/lonely-ramen)

## Props

Only required prop:

| Prop    | Type   | Description                                                                                                                             |
| ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `title` | string | The title of the header. This will show up as large text inside the scroll view and then fade in as the smaller text inside the header. |

From there, you can customize this component to get exactly what you want.

| Prop                            | Type                         | Description                                                                                                             |
| ------------------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `titleStyle`                    | React Native style or Object | Styles the large header title component inside the scroll view.                                                         |
| `containerStyle`                | React Native style or Object | Styles the entire container wrapping the header and the scrollview.                                                     |
| `headerContainerStyle`          | React Native style or Object | Styles the container of the header component that appears after scrolling.                                              |
| `headerComponentContainerStyle` | React Native style or Object | Styles the component inside the header. Anything within this style will fade in and out as the scroll position changes. |
| `headlineStyle`                 | React Native style or Object | Styles the header text inside the header that appears after scrolling.                                                  |
| `scrollContainerStyle`          | React Native style or Object | Styles the scroll view component.                                                                                       |
| `useFlatlist`                   | String                       | Use Flatlist instead of ScrollView,                                                                                     |
| `scrollViewProps`               | Object                       | Pass any extra props to the scrollView.                                                                                 |

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

This project is the custom fork of this [repository](https://github.com/jonsamp/react-native-header-scroll-view) which is not maintained now.
