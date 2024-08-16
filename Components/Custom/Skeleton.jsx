import { View, Text, StyleSheet, Animated } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import { useEffect } from "react";

const Skeleton = ({ width, height, customClass }) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1000,
      })
    ).start();
  }, [width]);

  return (
    <View
      style={StyleSheet.flatten([{ width: width, height: height }])}
      className={`${customClass}`}
    >
      <Animated.View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateX: translateX }],
        }}
      >
        <LinearGradient
          style={{ width: "100%", height: "100%" }}
          colors={["transparent", "#E2E8F0", "transparent"]}
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>
    </View>
  );
};

export default Skeleton;
