import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  useColorScheme,
  RefreshControl,
  Dimensions,
  Platform,
} from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInDown,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { Colors } from '../constants/Colors';
import { getAllLists } from '../lib/storage';
import { MnemonicList } from '../lib/types';
import ListCard from '../components/ListCard';
import { Pressable } from 'react-native';

const { width: W } = Dimensions.get('window');
const CARD_WIDTH = (W - 48) / 2;

function PressableScale({ onPress, style, children, ...props }: any) {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={[animStyle, style]}>
      <Pressable
        onPressIn={() => { scale.value = withSpring(0.94); }}
        onPressOut={() => { scale.value = withSpring(1); }}
        onPress={(e) => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onPress?.(e); }}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  const [lists, setLists] = useState<MnemonicList[]>([]);
  const [loading, setLoading] = useState(true);

  const fabScale = useSharedValue(0);
  const fabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: fabScale.value }],
  }));

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getAllLists();
    setLists(data);
    setLoading(false);
    fabScale.value = withSpring(1, { damping: 12 });
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const masteredCount = lists.filter((l) => l.mastered).length;

  const renderItem = useCallback(
    ({ item, index }: { item: MnemonicList; index: number }) => (
      <Animated.View
        entering={FadeInDown.delay(index * 60).springify()}
        style={{ width: CARD_WIDTH }}
      >
        <ListCard
          list={item}
          onPress={() => router.push({ pathname: '/list/[id]', params: { id: item.id } })}
        />
      </Animated.View>
    ),
    [router],
  );

  const glassCard = {
    backgroundColor: isDark ? 'rgba(20,20,43,0.6)' : 'rgba(255,255,255,0.6)',
    borderColor: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
    borderWidth: 1,
    ...(Platform.OS === 'web' ? { backdropFilter: 'blur(20px) saturate(180%)' as any } : {}),
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]} edges={['top']}>
      <LinearGradient
        colors={isDark ? ['#7B61FF20', '#09091A'] : ['#7B61FF10', '#F0F0FF']}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.header, glassCard]}>
        <View>
          <Text style={[styles.appName, { color: c.text }]}>Memora</Text>
          <Text style={[styles.tagline, { color: c.textMuted }]}>
            {lists.length === 0
              ? 'Your memory palace awaits'
              : `${lists.length} list${lists.length !== 1 ? 's' : ''} · ${masteredCount} mastered`}
          </Text>
        </View>
        {lists.length > 0 && (
          <View style={[styles.badge, { backgroundColor: c.accent + '22', borderColor: c.accent + '44' }]}>
            <Text style={[styles.badgeText, { color: c.accent }]}>
              {lists.length}
            </Text>
          </View>
        )}
      </View>

      {lists.length === 0 && !loading ? (
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🏛️</Text>
          <Text style={[styles.emptyTitle, { color: c.text }]}>No lists yet</Text>
          <Text style={[styles.emptySubtitle, { color: c.textMuted }]}>
            Tap the{' '}
            <Text style={{ color: c.accent, fontWeight: '700' }}>+ Create</Text>
            {' '}button below to{'\n'}generate your first mnemonic list.
          </Text>
        </View>
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={load}
              tintColor={c.accent}
              colors={[c.accent]}
            />
          }
        />
      )}

      {/* FAB */}
      <Animated.View style={[styles.fabContainer, fabStyle]}>
        <PressableScale
          style={[styles.fab, { backgroundColor: c.accent }]}
          onPress={() => router.push('/create')}
        >
          <LinearGradient
            colors={[c.accent, c.accentLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabGradient}
          >
            <Text style={styles.fabIcon}>+</Text>
            <Text style={styles.fabLabel}>Create</Text>
          </LinearGradient>
        </PressableScale>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    marginHorizontal: 0,
  },
  appName: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 16,
    fontWeight: '800',
  },
  listContent: {
    padding: 16,
    paddingBottom: 120,
    gap: 12,
  },
  row: {
    gap: 12,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 80,
  },
  emptyEmoji: {
    fontSize: 72,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  emptySubtitle: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 32,
    alignSelf: 'center',
  },
  fab: {
    borderRadius: 32,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  fabGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  fabIcon: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '300',
    lineHeight: 24,
  },
  fabLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
