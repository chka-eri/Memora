import React from 'react';
import { View, Text, StyleSheet, useColorScheme, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { MnemonicType } from '../lib/types';

const TYPE_CONFIG: Record<MnemonicType, { emoji: string; label: string; colorKey: keyof typeof Colors.dark }> = {
  acronym: { emoji: '🔤', label: 'Acronym', colorKey: 'accent' },
  story:   { emoji: '📖', label: 'Silly Story', colorKey: 'pink' },
  rhyme:   { emoji: '🎵', label: 'Rhyme Chain', colorKey: 'gold' },
  palace:  { emoji: '🏛️', label: 'Memory Palace', colorKey: 'teal' },
};

interface Props {
  type: MnemonicType;
  content: string;
  compact?: boolean;
}

export default function MnemonicCard({ type, content, compact }: Props) {
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? Colors.dark : Colors.light;
  const config = TYPE_CONFIG[type];
  const accentColor = c[config.colorKey] as string;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: c.card,
          borderColor: accentColor + '55',
          shadowColor: accentColor,
        },
      ]}
    >
      <View style={[styles.header, { borderBottomColor: accentColor + '33' }]}>
        <View style={[styles.badge, { backgroundColor: accentColor + '22' }]}>
          <Text style={styles.emoji}>{config.emoji}</Text>
          <Text style={[styles.label, { color: accentColor }]}>{config.label}</Text>
        </View>
      </View>

      <ScrollView
        scrollEnabled={!compact}
        nestedScrollEnabled
        style={compact ? { maxHeight: 120 } : undefined}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.content, { color: c.text }]} selectable>
          {content}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 6,
  },
  emoji: {
    fontSize: 15,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  content: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    padding: 16,
    paddingTop: 14,
  },
});
