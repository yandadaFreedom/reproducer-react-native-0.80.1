/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, View, Text } from 'react-native';
import { useState } from 'react';

function App() {
  const [start, setStart] = useState(0);
  const [move, setMove] = useState(0);
  const [end, setEnd] = useState(0);
  function onTouchStart(event: any) {
    setStart((prev) => prev + 1);
    console.log('Touch Start:', event.nativeEvent);
  }
  function onTouchMove(event: any) {
    setMove((prev) => prev + 1);
    console.log('Touch Move:', event.nativeEvent);
  }
  function onTouchEnd(event: any) {
    setEnd((prev) => prev + 1);
    console.log('Touch End:', event.nativeEvent);
  }
  return (
    <View style={styles.container} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <View><Text>touchstart count: {start}</Text></View>
      <View><Text>touchmove count: {move}</Text></View>
      <View><Text>touchend count: {end}</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: 'pink',
  },
});

export default App;
