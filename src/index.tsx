import React, { MutableRefObject, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  FlatListProps,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import Fade from 'react-native-fade';

const { height } = Dimensions.get('window');

const headerHeight = 60;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' },
  headerContainer: {
    height: headerHeight,
  },
  headerComponentContainer: {
    height: headerHeight,
    alignItems: 'center',
    // justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
    letterSpacing: 0.019,
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
  titleStyle?: StyleProp<TextStyle>;
  headlineStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  headerContainerStyle?: StyleProp<ViewStyle>;
  headerComponentContainerStyle?: StyleProp<ViewStyle>;
  scrollContainerStyle?: StyleProp<ViewStyle>;
  fadeDirection?: 'up' | 'down';
  scrollViewProps?: ScrollViewProps;
  flatListProps?: Omit<FlatListProps<any>, 'renderItem'>;
  renderItem?: any;
  flatListRef?: MutableRefObject<FlatList<any>>;
}
const HeaderScrollView: React.FC<Props> = (props) => {
  const initialState = {
    headerHeight: 0,
    headerY: 0,
    isHeaderScrolled: false,
    fadeDirection: '',
  };
  const [state, setState] = useState(initialState);

  const onLayout = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        headerHeight: event.nativeEvent.layout.height,
        headerY: event.nativeEvent.layout.y,
      };
    });
  };

  const scrollAnimatedValue = new Animated.Value(0);

  const handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.y;
    const scrollHeaderOffset = state.headerHeight + state.headerY - 8;
    const isHeaderScrolled = scrollHeaderOffset < offset;

    if (!state.isHeaderScrolled && isHeaderScrolled) {
      setState((prevState) => {
        return {
          ...prevState,
          isHeaderScrolled,
        };
      });
    }

    if (state.isHeaderScrolled && !isHeaderScrolled) {
      setState((prevState) => {
        return {
          ...prevState,
          isHeaderScrolled,
        };
      });
    }
  };

  const {
    useFlatlist,
    children,
    title = '',
    titleStyle,
    containerStyle = {},
    headerContainerStyle = {},
    headerComponentContainerStyle = {},
    headlineStyle = {},
    scrollContainerStyle = {},
    fadeDirection,
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

  const animatedFontSize = scrollAnimatedValue.interpolate({
    inputRange: [-height, 0],
    outputRange: [fontSize * 1.75, fontSize],
    extrapolate: 'clamp',
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
                  <Animated.Text
                    style={[
                      styles.title,
                      titleStyle,
                      titleStyles,
                      {
                        fontSize: animatedFontSize,
                      },
                    ]}
                    numberOfLines={2}
                    onLayout={onLayout}
                  >
                    {title}
                  </Animated.Text>
                </View>
              );
            }
            return renderItem({ item, index });
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: scrollAnimatedValue } },
              },
            ],
            {
              listener: handleScroll,
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={8}
          contentContainerStyle={scrollContainerStyle}
        />
      );
    }
    return (
      <ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollAnimatedValue } },
            },
          ],
          {
            listener: handleScroll,
            useNativeDriver: false,
          }
        )}
        scrollEventThrottle={8}
        contentContainerStyle={scrollContainerStyle}
        {...scrollViewProps}
      >
        <View>
          <Animated.Text
            style={[
              styles.title,
              titleStyle,
              titleStyles,
              {
                fontSize: animatedFontSize,
              },
            ]}
            onLayout={onLayout}
          >
            {title}
          </Animated.Text>
        </View>
        {children}
      </ScrollView>
    );
  };
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.headerContainer, headerContainerStyle]}>
        <Fade visible={state.isHeaderScrolled} direction={fadeDirection}>
          <View
            style={[
              styles.headerComponentContainer,
              headerComponentContainerStyle,
            ]}
          >
            <Text style={[styles.headline, headlineStyle]} numberOfLines={1}>
              {title}
            </Text>
          </View>
        </Fade>
      </View>
      {renderConditionalListView()}
    </View>
  );
};
export default HeaderScrollView;
