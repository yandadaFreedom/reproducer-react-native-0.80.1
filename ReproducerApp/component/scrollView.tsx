import React, { useRef, forwardRef, useMemo } from 'react';
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue, useScrollOffset } from 'react-native-reanimated';
import { ScrollViewContext } from './context';

const AnimatedScrollViewComponent = Animated.createAnimatedComponent(ScrollView);
const _ScrollView = forwardRef((props = {}, ref) => {

    const scrollViewRef = useAnimatedRef();
    const scrollOffset = useScrollOffset(scrollViewRef);

    const contextValue = useMemo(() => {
        return {
            gestureRef: scrollViewRef,
            scrollOffset,
        };
    }, [scrollOffset, scrollViewRef]);

    const onContentSizeChange = () => {
        console.log('onContentSizeChange', scrollOffset)
    }
    return (
        <GestureHandlerRootView style={{flex: 1}}>
        <AnimatedScrollViewComponent
            {...props}
            style={props.style}
            ref={scrollViewRef}
            onContentSizeChange={onContentSizeChange}
        >
            <ScrollViewContext.Provider value={contextValue}>
                {props.children}
            </ScrollViewContext.Provider>
        </AnimatedScrollViewComponent>
        </GestureHandlerRootView>
    );
});
_ScrollView.displayName = 'MpxScrollView';
export default _ScrollView;
