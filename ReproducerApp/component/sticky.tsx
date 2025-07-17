import { useRef, useContext, forwardRef, useMemo, createElement, useEffect } from 'react'
import { Animated, StyleSheet, useAnimatedValue } from 'react-native'
import { ScrollViewContext } from './context.ts'

const _StickyHeader = forwardRef((props = {}, ref) => {
  const {
    style,
  } = props

  const scrollViewContext = useContext(ScrollViewContext)
  const { scrollOffset } = scrollViewContext
  const headerRef = useRef(null)

  const headerTopAnimated = useAnimatedValue(0)

  function onLayout () {
    if (headerRef.current) {
      const scrollViewRef = scrollViewContext.gestureRef
      if (scrollViewRef && scrollViewRef.current) {
        headerRef.current.measureLayout(
          scrollViewRef.current,
          (left, top) => {
            Animated.timing(headerTopAnimated, {
              toValue: top,
              duration: 0,
              useNativeDriver: true
            }).start()
          }
        )
      }
    }
  }

  useEffect(() => {

    const listener = scrollOffset.addListener((state: { value: number }) => {
      console.log('listener', state.value)
    })

    return () => {
      scrollOffset.removeListener(listener)
    }
  }, [])


  const animatedStyle = useMemo(() => {
    const translateY = Animated.subtract(scrollOffset, 200).interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolateLeft: 'clamp',
      extrapolateRight: 'extend'
    })

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
        style:  Object.assign({}, styles.content, style, animatedStyle)
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
