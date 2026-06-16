import React, { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, useColorScheme } from 'react-native';
import { COLORS } from '@/constants/theme';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? COLORS.dark : COLORS.light;

  return (
    <View>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((v) => !v)}
        activeOpacity={0.8}
      >
        <Text style={{ color: c.textSub, fontSize: 14, marginRight: 4 }}>
          {isOpen ? '▾' : '▸'}
        </Text>
        <Text style={[styles.title, { color: c.text }]}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
