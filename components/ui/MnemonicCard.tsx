/**
 * MnemonicCard — Memora Design System
 *
 * Displays one of the 4 generated mnemonic types with a glowing
 * header badge, scrollable content area, and type-specific accent color.
 *
 * Usage:
 *   <MnemonicCard type="acronym" content={mnemonics.acronym} />
 *   <MnemonicCard type="palace"  content={mnemonics.palace}  compact />
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../app/_layout';
import {
  MNEMONIC_CONFIG,
  MnemonicType,
  SHADOWS,
  RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  LETTER_SPACING,
  LINE_HEIGHT,
} from '../../constants/theme';

interface MnemonicCardProps {
  type:     MnemonicType;
  content:  string;
  compact?: boolean;
}

export default function MnemonicCard({ type, content, compact }: MnemonicCardProps) {
  const { isDark, c } = useTheme();
  const cfg      = MNEMONIC_CONFIG[type];
  const accentHex = isDark ? cfg.darkHex : cfg.lightHex;

  // Glow shadow — type-specific
  const glowShadow = (() => {
    switch (type) {
      case 'acronym': return isDark ? SHADOWS.dark.glowPrimary : SHADOWS.light.glowPrimary;
      case 'story':   return isDark ? SHADOWS.dark.glowViolet  : SHADOWS.light.glowViolet;
      case 'rhyme':   return isDark ? SHADOWS.dark.glowGold    : SHADOWS.light.glowGold;
      case 'palace':  return isDark ? SHADOWS.dark.glowTeal    : SHADOWS.light.glowTeal;
    }
  })();

  // Derive tinted bg for the header band
  const headerBg  = accentHex + (isDark ? '1A' : '12'); // ~10% tint
  const badgeBg   = accentHex + (isDark ? '28' : '1E'); // ~15% tint
  const borderHex = accentHex + (isDark ? '44' : '55'); // ~27-33%

  return (
    <Animated.View
      entering={FadeIn.duration(260)}
      style={[
        styles.card,
        {
          backgroundColor: isDark ? c.card : c.card,
          borderColor:     borderHex,
          borderRadius:    RADIUS['2xl'],
        },
        glowShadow,
      ]}
    >
      {/* ── Header band ─────────────────────────────────────────────── */}
      <View
        style={[
          styles.header,
          {
            backgroundColor:    headerBg,
            borderBottomColor:  borderHex,
            borderTopLeftRadius:  RADIUS['2xl'],
            borderTopRightRadius: RADIUS['2xl'],
          },
        ]}
      >
        {/* Type badge */}
        <View style={[styles.badge, { backgroundColor: badgeBg }]}>
          <Text style={styles.badgeEmoji}>{cfg.emoji}</Text>
          <Text style={[styles.badgeLabel, { color: accentHex }]}>
            {cfg.label.toUpperCase()}
          </Text>
        </View>

        {/* Decorative glow dot — mirrors the neural node in the logo */}
        <View
          style={[
            styles.glowDot,
            {
              backgroundColor: accentHex,
              shadowColor:      accentHex,
              shadowOpacity:    0.85,
              shadowRadius:     8,
              shadowOffset:     { width: 0, height: 0 },
              elevation:        8,
            },
          ]}
        />
      </View>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <ScrollView
        scrollEnabled={!compact}
        nestedScrollEnabled
        style={compact ? { maxHeight: 128 } : undefined}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentWrap}
      >
        <Text
          style={[
            styles.content,
            {
              color:      isDark ? c.text : c.text,
              lineHeight: LINE_HEIGHT.base,
            },
          ]}
          selectable
        >
          {content}
        </Text>
      </ScrollView>

      {/* ── Bottom accent line ─────────────────────────────────────── */}
      <View
        style={[
          styles.bottomLine,
          {
            backgroundColor:  accentHex,
            borderBottomLeftRadius:  RADIUS['2xl'],
            borderBottomRightRadius: RADIUS['2xl'],
            opacity: isDark ? 0.35 : 0.25,
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth:  1.5,
    overflow:     'hidden',
  },

  // ── Header
  header: {
    flexDirection:    'row',
    alignItems:       'center',
    justifyContent:   'space-between',
    paddingHorizontal: 14,
    paddingVertical:   11,
    borderBottomWidth: 1,
  },
  badge: {
    flexDirection:  'row',
    alignItems:     'center',
    gap:            6,
    paddingHorizontal: 10,
    paddingVertical:    5,
    borderRadius:   999,
  },
  badgeEmoji: {
    fontSize: 14,
    lineHeight: 18,
  },
  badgeLabel: {
    fontSize:      FONT_SIZE.xs,
    fontWeight:    FONT_WEIGHT.extrabold,
    letterSpacing: LETTER_SPACING.caps,
    includeFontPadding: false,
  },
  glowDot: {
    width:        8,
    height:       8,
    borderRadius: 4,
  },

  // ── Content
  contentWrap: {
    padding:    16,
    paddingTop: 14,
  },
  content: {
    fontSize:           FONT_SIZE.base,
    fontWeight:         FONT_WEIGHT.regular,
    includeFontPadding: false,
  },

  // ── Bottom accent strip
  bottomLine: {
    height: 3,
  },
});
