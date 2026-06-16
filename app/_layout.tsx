import '../global.css';

import React, { createContext, useContext } from 'react';
import { View, useColorScheme, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, ThemeColors } from '../constants/theme';

// ─── Theme Context ────────────────────────────────────────────────────────────

interface ThemeContextValue {
  isDark: boolean;
  c: ThemeColors;
  colorScheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  c: COLORS.dark,
  colorScheme: 'dark',
});

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

// ─── Root Layout ──────────────────────────────────────────────────────────────

export default function RootLayout() {
  const scheme = useColorScheme();
  const isDark = scheme !== 'light';
  const c = isDark ? COLORS.dark : COLORS.light;

  const themeValue: ThemeContextValue = {
    isDark,
    c,
    colorScheme: isDark ? 'dark' : 'light',
  };

  return (
    <ThemeContext.Provider value={themeValue}>
      <GestureHandlerRootView className="flex-1" style={{ backgroundColor: c.bg }}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={c.bg}
            translucent={false}
          />

          {/*
           * NativeWind needs a root View to anchor dark-mode media queries.
           * className="flex-1" lets it fill the screen.
           */}
          <View className="flex-1 bg-light-bg dark:bg-dark-bg">
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: c.bg },
                animation: 'ios_from_right',
              }}
            />
          </View>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeContext.Provider>
  );
}
