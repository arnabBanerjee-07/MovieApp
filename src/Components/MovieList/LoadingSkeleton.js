import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const LoadingSkeleton = () => {
  const shimmerAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnimation]);

  const shimmerOpacity = shimmerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.image, { opacity: shimmerOpacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 10,
    marginTop:10
  },
  image: {
    height: 150,
    width: 120,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
  },
});

export default LoadingSkeleton;