import React, { useRef, forwardRef, useMemo } from 'react';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue, useScrollOffset } from 'react-native-reanimated';
import { ScrollViewContext } from './context';


const _ScrollView = forwardRef((props = {}, ref) => {
    // const scrollOffset = useSharedValue(0)

    const scrollViewRef = useAnimatedRef();
    const scrollOffset = useScrollOffset(scrollViewRef);

    const contextValue = useMemo(() => {
        return {
            gestureRef: scrollViewRef,
            scrollOffset,
        };
    }, [scrollOffset, scrollViewRef]);

    // const scrollHandler = useAnimatedScrollHandler((event) => {
    //     console.log('scrollHandler', event.contentOffset.y)
    //     scrollOffset.value = event.contentOffset.y;
    // })

    const onContentSizeChange = () => {
        console.log('onContentSizeChange', scrollOffset)
    }
    return (
        <GestureHandlerRootView style={{flex: 1}}>
        <Animated.ScrollView
            {...props}
            style={props.style}
            ref={scrollViewRef}
            onContentSizeChange={onContentSizeChange}
        >
            <ScrollViewContext.Provider value={contextValue}>
                {props.children}
            </ScrollViewContext.Provider>
        </Animated.ScrollView>
        </GestureHandlerRootView>
    );
});
_ScrollView.displayName = 'MpxScrollView';
export default _ScrollView;
