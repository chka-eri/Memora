import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

const { width: W, height: H } = Dimensions.get('window');
const CONFETTI_COLORS = [
  '#7B61FF', '#FF6B9D', '#FFD166', '#00E5A0',
  '#00BFFF', '#FF9F43', '#A29BFE', '#FD79A8',
];
const COUNT = 48;

interface ParticleProps {
  index: number;
}

function Particle({ index }: ParticleProps) {
  const seed = index * 137.5;
  const angle = (seed % 360) * (Math.PI / 180);
  const speed = 180 + (seed % 200);
  const targetX = Math.cos(angle) * speed;
  const targetY = -(Math.sin(angle) * speed + 80 + (seed % 120));
  const delay = (index % 12) * 40;
  const color = CONFETTI_COLORS[index % CONFETTI_COLORS.length];
  const size = 6 + (index % 6);
  const isCircle = index % 3 === 0;

  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withSequence(
        withTiming(1, { duration: 80 }),
        withTiming(1, { duration: 1100 }),
        withTiming(0, { duration: 600 }),
      ),
    );
    x.value = withDelay(
      delay,
      withSequence(
        withTiming(targetX, { duration: 700, easing: Easing.out(Easing.quad) }),
        withTiming(targetX + (index % 2 === 0 ? 30 : -30), { duration: 800 }),
      ),
    );
    y.value = withDelay(
      delay,
      withSequence(
        withTiming(targetY, { duration: 700, easing: Easing.out(Easing.quad) }),
        withTiming(H * 0.6, { duration: 900, easing: Easing.in(Easing.quad) }),
      ),
    );
    rotate.value = withDelay(
      delay,
      withTiming((index % 2 === 0 ? 540 : -540), { duration: 1600 }),
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
    backgroundColor: color,
    width: size,
    height: size,
    borderRadius: isCircle ? size / 2 : 2,
  }));

  return <Animated.View style={[styles.particle, style]} />;
}

interface ConfettiProps {
  active: boolean;
  originY?: number;
}

export default function Confetti({ active, originY = H * 0.6 }: ConfettiProps) {
  if (!active) return null;

  return (
    <View
      style={[styles.container, { top: originY }]}
      pointerEvents="none"
    >
      {Array.from({ length: COUNT }, (_, i) => (
        <Particle key={i} index={i} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: W / 2,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    overflow: 'visible',
  },
  particle: {
    position: 'absolute',
  },
});
