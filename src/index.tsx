import React, { MutableRefObject, useState } from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

const headerHeight = 45;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  headerContainer: {
    height: headerHeight,
  },
  headerComponentContainer: {
    height: headerHeight,
    alignItems: 'center',
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0.019,
    textAlign: 'center',
    width: Dimensions.get('window').width / 2.5,
  },
  title: {
    letterSpacing: 0.011,
    fontWeight: '700',
    paddingHorizontal: 16,
  },
});

export interface HeaderProps {
  id: 'header1' | 'header2';
  component: JSX.Element;
}
interface Props {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  headlineStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerComponentContainerStyle?: StyleProp<ViewStyle>;
  scrollContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: ScrollViewProps;
  headers: HeaderProps[];
  //flat lit related props
  useFlatlist?: boolean;
  data?: ReadonlyArray<any> | null | undefined;
  flatListProps?: Omit<FlatListProps<any>, 'renderItem' | 'data'>;
  flatListRef?: MutableRefObject<FlatList<any>>;
  renderItem?: any;
}

const HeaderScrollView: React.FC<Props> = (props) => {
  const initialState = {
    headerHeight: 0,
    headerY: 0,
  };
  const [state, setState] = useState(initialState);

  const onLayout = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        headerHeight: event?.nativeEvent?.layout?.height ?? 0,
        headerY: event?.nativeEvent?.layout?.y ?? 0,
      };
    });
  };

  const scrollAnimatedValue = useSharedValue(0);
  const isHeaderScrolled = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    const offset = event?.contentOffset.y;
    scrollAnimatedValue.value = offset;

    const scrollHeaderOffset = state.headerHeight + state.headerY - 8;
    isHeaderScrolled.value = scrollHeaderOffset < offset;
  });

  const {
    useFlatlist,
    title = '',
    children,
    titleStyle,
    containerStyle = {},
    headerContainerStyle = {},
    headerComponentContainerStyle = {},
    headlineStyle = {},
    scrollContainerStyle = {},
    scrollViewProps = {},
    flatListProps,
    renderItem,
    data,
    headers,
    flatListRef,
  } = props;

  //@ts-ignore
  const fontSize = titleStyle?.fontSize ?? 34;
  const titleStyles = {
    fontSize,
    lineHeight: fontSize * 1.2,
  };

  const fontSizeStyle = useAnimatedStyle(() => {
    const animatedFontSize = interpolate(
      scrollAnimatedValue.value,
      [-height, 0],
      [fontSize * 1.75, fontSize],
      Extrapolate.CLAMP
    );
    return {
      fontSize: animatedFontSize,
    };
  });

  const titleFadeStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isHeaderScrolled.value ? 1 : 0, {
        duration: 200,
        easing: Easing.ease,
      }),
    };
  });

  const renderParallaxHeader = ({ item, index }) => {
    if (item.id === 'header1') {
      return (
        <View key={item.id}>
          {item.component ? (
            <Animated.View onLayout={onLayout}>{item.component}</Animated.View>
          ) : (
            <Animated.Text
              style={[styles.title, titleStyle, titleStyles, fontSizeStyle]}
              numberOfLines={2}
              onLayout={onLayout}
            >
              {title}
            </Animated.Text>
          )}
        </View>
      );
    }
    if (item.id === 'header2') {
      return <View key={item.id}>{item.component}</View>;
    }
    if (useFlatlist) {
      return renderItem({ item, index });
    }
  };

  const renderConditionalListView = () => {
    if (useFlatlist) {
      const dataWithHeaders = headers ? [...headers, ...(data ?? [])] : data;
      return (
        <FlatList
          {...flatListProps}
          ref={flatListRef}
          renderItem={({ item, index }) => {
            return renderParallaxHeader({ item, index });
          }}
          data={dataWithHeaders}
          renderScrollComponent={(scrollProps) => {
            return (
              <Animated.ScrollView
                {...scrollProps}
                onScroll={scrollHandler}
                scrollEventThrottle={8}
                contentContainerStyle={scrollContainerStyle}
              />
            );
          }}
        />
      );
    }
    return (
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={8}
        contentContainerStyle={scrollContainerStyle}
        {...scrollViewProps}
      >
        {headers?.map((item, index) => {
          return renderParallaxHeader({ item, index });
        })}
        {children}
      </Animated.ScrollView>
    );
  };
  return (
    <View style={[styles.container, containerStyle]}>
      {title ? (
        <View style={[styles.headerContainer, headerContainerStyle]}>
          <Animated.View
            style={[
              styles.headerComponentContainer,
              headerComponentContainerStyle,
              titleFadeStyle,
            ]}
          >
            <Text style={[styles.headline, headlineStyle]} numberOfLines={1}>
              {title}
            </Text>
          </Animated.View>
        </View>
      ) : null}
      {renderConditionalListView()}
    </View>
  );
};
export default HeaderScrollView;
