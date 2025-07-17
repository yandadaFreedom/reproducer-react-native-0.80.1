import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated as RNAnimated,
} from "react-native";
import StickyHeader from './component/sticky';
import { ScrollViewContext } from './component/context';

const AnimatedScrollView = RNAnimated.createAnimatedComponent(ScrollView);

const App = () => {

  const scrollOffset = useRef(new RNAnimated.Value(0)).current;

  const obj = {
    1: "tab1",
    2: "tab2",
    3: "tab3",
  };

  const [currentId, setCurrentId] = useState(1);
  const [content, setContent] = useState("tab1");
  const [isShow, setIsShow] = useState(false);
  const [heightValue] = useState({
    1: 1200,
    2: 800,
    3: 1200,
  });

  const handleTap = (id) => {
    setContent(obj[id]);
    setCurrentId(id);
    if (id === 2) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };


  const contextValue = useMemo(() => {
    return {
      scrollOffset,
    };
  }, [scrollOffset]);

  const scrollHandler = RNAnimated.event([{ nativeEvent: { contentOffset: { y: scrollOffset } } }], {
    useNativeDriver: true,
    listener: (event) => {
      const y = event.nativeEvent.contentOffset.y || 0
      console.log('y', y, (scrollOffset as any).__getValue())
    }
  });

  return (
    <View style={styles.rootView}>
      <AnimatedScrollView style={[styles.container, { flex: 1, marginTop: 84 }]} onScroll={scrollHandler} overScrollMode={'never'}>
        <ScrollViewContext.Provider value={contextValue}>
          <View style={styles.empty} />
          <StickyHeader style={styles.parkHead}>
            <View style={styles.tabContainer}>
              <TouchableOpacity style={styles.tab} onPress={() => handleTap(1)}>
                <Text style={styles.tabText}>tab1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab} onPress={() => handleTap(2)}>
                <Text style={styles.tabText}>tab2</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab} onPress={() => handleTap(3)}>
                <Text style={styles.tabText}>tab3</Text>
              </TouchableOpacity>
            </View>
            {currentId === 1 && (
              <View style={styles.first}>
                <View style={styles.green}></View>
                <View style={styles.red}></View>
              </View>
            )}
            {currentId === 2 && (
              <View style={styles.twice}>
                <View style={styles.green}></View>
                {isShow && <View style={styles.red}></View>}
              </View>
            )}
            {currentId === 3 && (
              <View style={styles.second}>
                <View style={styles.green}></View>
                <View style={styles.red}></View>
              </View>
            )}
          </StickyHeader>

          {/* Content */}
          <View style={[styles.content, { height: heightValue[currentId] }]}>
            <Text style={styles.contentText}>{content}</Text>
          </View>
        </ScrollViewContext.Provider>
      </AnimatedScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    backgroundColor: "#F5F7FA",
    height: "100%",
    width: "100%",
    flex: 1
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
  empty: {
    height: 200,
  },
  park: {
    display: "flex",
    flex: 1,
  },
  parkHead: {
    width: "100%",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    width: "33%",
    height: 40,
    borderWidth: 1,
    borderColor: "red",
  },
  tabText: {
    color: "black",
  },
  content: {
    flex: 1,
    backgroundColor: "pink",
    position: "relative",
    zIndex: -1,
  },
  contentText: {
    color: "white",
    padding: 10,
  },
  green: {
    width: "100%",
    height: 20,
    backgroundColor: "green",
  },
  red: {
    width: "100%",
    height: 20,
    backgroundColor: "red",
  },
  tabContainer: {
    width: "100%",
    height: 40,
    backgroundColor: "yellow",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
});

export default App;
