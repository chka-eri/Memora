import '../global.css';

import React, { createContext, useContext } from 'react';
import { View, useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS, ThemeColors } from '../constants/theme';

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
          <StatusBar style={isDark ? 'light' : 'dark'} />
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
