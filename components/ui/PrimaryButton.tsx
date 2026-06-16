/**
 * PrimaryButton — Memora Design System
 *
 * Variants:
 *   "indigo"  — deep indigo (default CTA, matches logo body)
 *   "cyan"    — electric cyan (neural / secondary actions)
 *   "violet"  — soft violet (mnemonic / accent actions)
 *   "ghost"   — transparent bordered (tertiary / cancel)
 *   "danger"  — rose red (destructive)
 *
 * Sizes: "sm" | "md" (default) | "lg"
 *
 * Usage:
 *   <PrimaryButton label="Generate Mnemonics" icon="✨" onPress={…} />
 *   <PrimaryButton label="Cancel" variant="ghost" size="sm" onPress={…} />
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../app/_layout';
import { SHADOWS, RADIUS } from '../../constants/theme';

type Variant = 'indigo' | 'cyan' | 'violet' | 'ghost' | 'danger';
type Size    = 'sm' | 'md' | 'lg';

interface PrimaryButtonProps {
  label:     string;
  icon?:     string;
  onPress:   () => void;
  variant?:  Variant;
  size?:     Size;
  loading?:  boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

// Size tokens
const SIZE = {
  sm: { px: 16, py: 10, fontSize: 13, iconSize: 14, radius: RADIUS.lg,  gap: 6  },
  md: { px: 24, py: 14, fontSize: 15, iconSize: 16, radius: RADIUS.xl,  gap: 8  },
  lg: { px: 28, py: 17, fontSize: 17, iconSize: 18, radius: RADIUS['2xl'], gap: 10 },
} as const;

export default function PrimaryButton({
  label,
  icon,
  onPress,
  variant  = 'indigo',
  size     = 'md',
  loading  = false,
  disabled = false,
  fullWidth = false,
}: PrimaryButtonProps) {
  const { isDark, c } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const sz = SIZE[size];

  // ── Resolve fill colors per variant ───────────────────────────────────
  const variantStyle = (() => {
    if (disabled || loading) {
      return {
        bg:         isDark ? '#1E1E48' : '#DDDAF8',
        border:     isDark ? '#252558' : '#C8C4FF',
        text:       isDark ? '#4A4A80' : '#A0A0C8',
        shadow:     null,
        isOutlined: false,
      };
    }
    switch (variant) {
      case 'cyan':
        return {
          bg:         c.cyan,
          border:     c.cyan,
          text:       '#03030A',
          shadow:     isDark ? SHADOWS.dark.glowCyan : SHADOWS.light.glowCyan,
          isOutlined: false,
        };
      case 'violet':
        return {
          bg:         c.violet,
          border:     c.violet,
          text:       '#FFFFFF',
          shadow:     isDark ? SHADOWS.dark.glowViolet : SHADOWS.light.glowViolet,
          isOutlined: false,
        };
      case 'ghost':
        return {
          bg:         'transparent',
          border:     isDark ? c.border : c.borderLit,
          text:       isDark ? c.text : c.primary,
          shadow:     null,
          isOutlined: true,
        };
      case 'danger':
        return {
          bg:         c.danger,
          border:     c.danger,
          text:       '#FFFFFF',
          shadow:     null,
          isOutlined: false,
        };
      case 'indigo':
      default:
        return {
          bg:         c.primary,
          border:     c.primary,
          text:       '#FFFFFF',
          shadow:     isDark ? SHADOWS.dark.glowPrimary : SHADOWS.light.glowPrimary,
          isOutlined: false,
        };
    }
  })();

  return (
    <Animated.View
      style={[
        animStyle,
        fullWidth && styles.fullWidth,
        variantStyle.shadow ?? undefined,
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 12, stiffness: 300 });
        }}
        disabled={disabled || loading}
        activeOpacity={1}
        style={[
          styles.btn,
          {
            backgroundColor: variantStyle.bg,
            borderColor:      variantStyle.border,
            borderRadius:     sz.radius,
            paddingHorizontal: sz.px,
            paddingVertical:   sz.py,
          },
          fullWidth && styles.fullWidth,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            color={variantStyle.text}
            size="small"
          />
        ) : (
          <View style={[styles.inner, { gap: sz.gap }]}>
            {icon ? (
              <Text style={{ fontSize: sz.iconSize }}>{icon}</Text>
            ) : null}
            <Text
              style={[
                styles.label,
                {
                  fontSize:   sz.fontSize,
                  color:      variantStyle.text,
                  letterSpacing: variant === 'ghost' ? 0.2 : 0.3,
                },
              ]}
            >
              {label}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  btn: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44, // accessibility minimum
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: '700',
    includeFontPadding: false,
  },
});
