import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { MnemonicList } from '../lib/types';

interface Props {
  list: MnemonicList;
  onPress: () => void;
}

const MNEMONIC_ICONS = ['🔤', '📖', '🎵', '🏛️'];

export default function ListCard({ list, onPress }: Props) {
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? Colors.dark : Colors.light;
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const reviewCount = list.reviewHistory.length;
  const createdDate = new Date(list.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Animated.View style={animStyle}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => { scale.value = withSpring(0.95, { damping: 15 }); }}
        onPressOut={() => { scale.value = withSpring(1, { damping: 15 }); }}
        activeOpacity={1}
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: c.card,
              borderColor: list.mastered ? c.gold + '55' : c.border,
              shadowColor: list.mastered ? c.gold : c.accent,
            },
          ]}
        >
          {list.mastered && (
            <View style={[styles.masteredBanner, { backgroundColor: c.gold + '22' }]}>
              <Text style={[styles.masteredText, { color: c.gold }]}>⭐ Mastered</Text>
            </View>
          )}

          <Text style={[styles.title, { color: c.text }]} numberOfLines={2}>
            {list.title}
          </Text>

          <View style={styles.pills}>
            {list.items.slice(0, 4).map((item, i) => (
              <View key={i} style={[styles.pill, { backgroundColor: c.surface, borderColor: c.border }]}>
                <Text style={[styles.pillText, { color: c.textSub }]} numberOfLines={1}>
                  {item}
                </Text>
              </View>
            ))}
            {list.items.length > 4 && (
              <View style={[styles.pill, { backgroundColor: c.accent + '22', borderColor: c.accent + '44' }]}>
                <Text style={[styles.pillText, { color: c.accent }]}>
                  +{list.items.length - 4}
                </Text>
              </View>
            )}
          </View>

          <View style={styles.footer}>
            <View style={styles.footerLeft}>
              {MNEMONIC_ICONS.map((icon, i) => (
                <Text key={i} style={styles.typeIcon}>{icon}</Text>
              ))}
            </View>
            <Text style={[styles.meta, { color: c.textMuted }]}>
              {reviewCount > 0 ? `🔁 ${reviewCount}` : createdDate}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 16,
    paddingBottom: 14,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  masteredBanner: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 10,
  },
  masteredText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 10,
    letterSpacing: 0.1,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 12,
  },
  pill: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 3,
    maxWidth: 90,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flexDirection: 'row',
    gap: 4,
  },
  typeIcon: {
    fontSize: 12,
  },
  meta: {
    fontSize: 12,
    fontWeight: '500',
  },
});
