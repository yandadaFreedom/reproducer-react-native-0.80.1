import { View, Text, Pressable, TouchableWithoutFeedback } from 'react-native';

function HomeScreen() {
  const onTouchStart = (e: any) => {
    console.log('onTouchStart', e.nativeEvent.changedTouches[0]);
  };
  const onTouchEnd = (e: any) => {
    console.log('onTouchEnd', e.nativeEvent.changedTouches[0]);
  };

  const onTouchMove = (e: any) => {
    console.log('onTouchMove', e.nativeEvent.changedTouches[0]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
      <View
        style={{
          height: 50,
          marginTop: 20,
          marginBottom: 50,
          backgroundColor: 'pink',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Text>touch event</Text>
      </View>

      <Pressable
        onPressIn={() => console.log('Pressable Pressed')}
        onPressOut={() => console.log('Pressable Released')}
      >
        <View
          style={{
            height: 50,
            marginTop: 20,
            marginBottom: 50,
            backgroundColor: 'pink',
          }}
        >
          <Text>Pressable event</Text>
        </View>
      </Pressable>

      <TouchableWithoutFeedback
        onPress={() => console.log('TouchableWithoutFeedback Pressed')}
      >
        <View
          style={{
            height: 50,
            marginTop: 20,
            marginBottom: 50,
            backgroundColor: 'pink',
          }}
        >
          <Text>TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>

      <View
        style={{
          height: 200,
          marginTop: 50,
          marginBottom: 50,
          backgroundColor: 'red',
        }}
      >
        <Text> No event content </Text>
      </View>
    </View>
  );
}

export default function App() {
  return <HomeScreen />;
}
