import { useRef, useContext, forwardRef, createElement } from 'react'
import { StyleSheet } from 'react-native'
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  interpolate,
  Extrapolate,
  withTiming
} from 'react-native-reanimated'
import { ScrollViewContext } from './context.ts'

interface StickyHeaderProps {
  style?: any;
  children?: React.ReactNode;
  [key: string]: any;
}

const _StickyHeader = forwardRef<any, StickyHeaderProps>((props, _ref) => {
  const {
    style,
  } = props

  const scrollViewContext = useContext(ScrollViewContext)
  const { scrollOffset } = scrollViewContext
  const headerRef = useRef<any>(null)

  const headerTopAnimated = useSharedValue(0)

  function onLayout () {
    if (headerRef.current) {
      const scrollViewRef = scrollViewContext.gestureRef
      if (scrollViewRef && scrollViewRef.current) {
        headerRef.current.measureLayout(
          scrollViewRef.current,
          (left: number, top: number) => {
            headerTopAnimated.value = withTiming(top, { duration: 0 })
          }
        )
      }
    }
  }

 
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollOffset.value - headerTopAnimated.value,
      [0, 1],
      [0, 1],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.EXTEND
      }
    )
    return {
      transform: [{ translateY: translateY }]
    }
  }, [scrollOffset, headerTopAnimated])


  return (
    createElement(
      Animated.View,
      Object.assign({}, props, {
        onLayout,
        ref: headerRef,
        style: Object.assign({}, styles.content, style, animatedStyle)
      }),
      props.children
    )
  )
})

const styles = StyleSheet.create({
  content: {
    width: '100%',
    zIndex: 10,
    position: 'relative'
  }
})

_StickyHeader.displayName = 'MpxStickyHeader'
export default _StickyHeader
