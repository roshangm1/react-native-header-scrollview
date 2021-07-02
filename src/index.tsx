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

interface Props {
  title: string;
  useFlatlist?: boolean;
  titleComponent?: any;
  titleStyle?: StyleProp<TextStyle>;
  headlineStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerComponentContainerStyle?: StyleProp<ViewStyle>;
  scrollContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: ScrollViewProps;
  flatListProps?: Omit<FlatListProps<any>, 'renderItem'>;
  renderItem?: any;
  flatListRef?: MutableRefObject<FlatList<any>>;
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
    children,
    title = '',
    titleStyle,
    titleComponent,
    containerStyle = {},
    headerContainerStyle = {},
    headerComponentContainerStyle = {},
    headlineStyle = {},
    scrollContainerStyle = {},
    scrollViewProps = {},
    flatListProps,
    renderItem,
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

  const renderConditionalListView = () => {
    if (useFlatlist) {
      return (
        <FlatList
          {...flatListProps}
          ref={flatListRef}
          renderItem={({ item, index }) => {
            if (index === 0) {
              return (
                <View>
                  {titleComponent ? (
                    <Animated.View onLayout={onLayout}>
                      {titleComponent}
                    </Animated.View>
                  ) : (
                    <Animated.Text
                      style={[
                        styles.title,
                        titleStyle,
                        titleStyles,
                        fontSizeStyle,
                      ]}
                      numberOfLines={2}
                      onLayout={onLayout}
                    >
                      {title}
                    </Animated.Text>
                  )}
                </View>
              );
            }
            return renderItem({ item, index });
          }}
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
        <Animated.Text
          style={[styles.title, titleStyle, titleStyles, fontSizeStyle]}
          numberOfLines={2}
          onLayout={onLayout}
        >
          {title}
        </Animated.Text>
        {children}
      </Animated.ScrollView>
    );
  };
  return (
    <View style={[styles.container, containerStyle]}>
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
      {renderConditionalListView()}
    </View>
  );
};
export default HeaderScrollView;
