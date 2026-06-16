import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { getAllLists, deleteList, recordReview, setMastered } from '../../lib/storage';
import { MnemonicList, MnemonicType } from '../../lib/types';
import MnemonicCard from '../../components/MnemonicCard';
import HeatMap from '../../components/HeatMap';
import Confetti from '../../components/Confetti';

const { height: H } = Dimensions.get('window');

const TABS: Array<{ key: MnemonicType; emoji: string; label: string }> = [
  { key: 'acronym', emoji: '🔤', label: 'Acronym' },
  { key: 'story',   emoji: '📖', label: 'Story' },
  { key: 'rhyme',   emoji: '🎵', label: 'Rhyme' },
  { key: 'palace',  emoji: '🏛️', label: 'Palace' },
];

export default function ListDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  const [list, setList] = useState<MnemonicList | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<MnemonicType>('acronym');
  const [confettiActive, setConfettiActive] = useState(false);
  const [masteredButtonY, setMasteredButtonY] = useState(H * 0.6);

  const masterScale = useSharedValue(1);
  const masterStyle = useAnimatedStyle(() => ({
    transform: [{ scale: masterScale.value }],
  }));

  const load = useCallback(async () => {
    const lists = await getAllLists();
    const found = lists.find((l) => l.id === id) ?? null;
    setList(found);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleReview = async () => {
    if (!list) return;
    await recordReview(list.id);
    await load();
  };

  const handleMastered = async () => {
    if (!list || list.mastered) return;
    masterScale.value = withSequence(
      withSpring(1.15, { damping: 8 }),
      withSpring(1, { damping: 10 }),
    );
    await setMastered(list.id);
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 2500);
    await load();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete List',
      `Remove "${list?.title}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            if (!list) return;
            await deleteList(list.id);
            router.back();
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]} edges={['top']}>
        <ActivityIndicator style={{ flex: 1 }} color={c.accent} size="large" />
      </SafeAreaView>
    );
  }

  if (!list) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]} edges={['top']}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundEmoji}>🔍</Text>
          <Text style={[styles.notFoundText, { color: c.text }]}>List not found</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.backLink, { color: c.accent }]}>← Go back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]} edges={['top']}>
      <Confetti active={confettiActive} originY={masteredButtonY} />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: c.border }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: c.surface, borderColor: c.border }]}
        >
          <Text style={[styles.backIcon, { color: c.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: c.text }]} numberOfLines={1}>
          {list.title}
        </Text>
        <TouchableOpacity
          onPress={handleDelete}
          style={[styles.deleteBtn, { backgroundColor: c.surface, borderColor: c.border }]}
        >
          <Text style={{ fontSize: 16 }}>🗑️</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Banner */}
        {list.mastered && (
          <Animated.View
            entering={FadeInDown.springify()}
            style={[styles.masteredBanner, { backgroundColor: c.gold + '22', borderColor: c.gold + '55' }]}
          >
            <Text style={[styles.masteredBannerText, { color: c.gold }]}>
              ⭐ Mastered — excellent work!
            </Text>
          </Animated.View>
        )}

        {/* Items */}
        <Animated.View entering={FadeInDown.delay(60).springify()}>
          <Text style={[styles.sectionLabel, { color: c.textMuted }]}>
            📝 {list.items.length} ITEMS
          </Text>
          <View style={styles.itemChips}>
            {list.items.map((item, i) => (
              <View key={i} style={[styles.chip, { backgroundColor: c.card, borderColor: c.border }]}>
                <Text style={[styles.chipNum, { color: c.accent }]}>{i + 1}</Text>
                <Text style={[styles.chipText, { color: c.text }]}>{item}</Text>
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Mnemonic Tabs */}
        <Animated.View entering={FadeInDown.delay(120).springify()} style={{ marginTop: 24 }}>
          <Text style={[styles.sectionLabel, { color: c.textMuted }]}>🧠 MNEMONICS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10, marginBottom: 14 }}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 2 }}
          >
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tab,
                  {
                    backgroundColor: activeTab === tab.key ? c.accent : c.card,
                    borderColor: activeTab === tab.key ? c.accent : c.border,
                  },
                ]}
              >
                <Text style={styles.tabEmoji}>{tab.emoji}</Text>
                <Text
                  style={[
                    styles.tabLabel,
                    { color: activeTab === tab.key ? '#FFFFFF' : c.textSub },
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <MnemonicCard type={activeTab} content={list.mnemonics[activeTab]} />
        </Animated.View>

        {/* Heat Map */}
        <Animated.View entering={FadeInDown.delay(180).springify()} style={{ marginTop: 24 }}>
          <HeatMap reviewHistory={list.reviewHistory} mastered={list.mastered} />
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View entering={FadeInDown.delay(240).springify()} style={styles.actions}>
          <TouchableOpacity
            style={[styles.reviewBtn, { backgroundColor: c.card, borderColor: c.border }]}
            onPress={handleReview}
            activeOpacity={0.8}
          >
            <Text style={[styles.reviewBtnText, { color: c.text }]}>📚 Mark Reviewed</Text>
          </TouchableOpacity>

          <Animated.View style={masterStyle}>
            <TouchableOpacity
              style={[
                styles.masterBtn,
                {
                  backgroundColor: list.mastered ? c.gold + '22' : c.gold,
                  borderColor: c.gold,
                  shadowColor: c.gold,
                },
              ]}
              onPress={handleMastered}
              disabled={list.mastered}
              activeOpacity={0.85}
              onLayout={(e) => setMasteredButtonY(e.nativeEvent.layout.y)}
            >
              <Text
                style={[
                  styles.masterBtnText,
                  { color: list.mastered ? c.gold : '#0A0A1B' },
                ]}
              >
                {list.mastered ? '⭐ Mastered!' : '⭐ Mark as Mastered'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: { fontSize: 20, fontWeight: '600' },
  headerTitle: { flex: 1, fontSize: 17, fontWeight: '700', textAlign: 'center', marginHorizontal: 8 },
  deleteBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { padding: 20, paddingBottom: 40 },
  masteredBanner: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  masteredBannerText: { fontSize: 15, fontWeight: '700', letterSpacing: 0.3 },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
  },
  itemChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  chipNum: { fontSize: 11, fontWeight: '800' },
  chipText: { fontSize: 14, fontWeight: '500' },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 24,
    borderWidth: 1.5,
  },
  tabEmoji: { fontSize: 14 },
  tabLabel: { fontSize: 13, fontWeight: '600' },
  actions: { marginTop: 8, gap: 12 },
  reviewBtn: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 15,
    alignItems: 'center',
  },
  reviewBtnText: { fontSize: 15, fontWeight: '700' },
  masterBtn: {
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 15,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  masterBtnText: { fontSize: 15, fontWeight: '800', letterSpacing: 0.2 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundEmoji: { fontSize: 48 },
  notFoundText: { fontSize: 18, fontWeight: '700' },
  backLink: { fontSize: 16, fontWeight: '600' },
});
