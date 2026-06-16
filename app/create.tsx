import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '../constants/Colors';
import { generateAllMnemonics } from '../lib/mnemonicGenerator';
import { saveList } from '../lib/storage';
import { MnemonicList, MnemonicType } from '../lib/types';
import MnemonicCard from '../components/MnemonicCard';

const TABS: Array<{ key: MnemonicType; emoji: string; label: string }> = [
  { key: 'acronym', emoji: '🔤', label: 'Acronym' },
  { key: 'story',   emoji: '📖', label: 'Story' },
  { key: 'rhyme',   emoji: '🎵', label: 'Rhyme' },
  { key: 'palace',  emoji: '🏛️', label: 'Palace' },
];

export default function CreateScreen() {
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? Colors.dark : Colors.light;
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [itemsText, setItemsText] = useState('');
  const [generated, setGenerated] = useState<MnemonicList | null>(null);
  const [activeTab, setActiveTab] = useState<MnemonicType>('acronym');
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const btnScale = useSharedValue(1);
  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  const parseItems = () =>
    itemsText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

  const handleGenerate = () => {
    const items = parseItems();
    if (items.length < 2) return;
    setGenerating(true);
    setTimeout(() => {
      const mnemonics = generateAllMnemonics(items);
      const now = new Date().toISOString();
      setGenerated({
        id: Date.now().toString(),
        title: title.trim() || items.slice(0, 3).join(', '),
        items,
        mnemonics,
        createdAt: now,
        lastReviewed: null,
        reviewHistory: [],
        mastered: false,
      });
      setGenerating(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150);
    }, 400);
  };

  const handleSave = async () => {
    if (!generated) return;
    setSaving(true);
    try {
      await saveList(generated);
      router.replace('/');
    } finally {
      setSaving(false);
    }
  };

  const itemCount = parseItems().length;
  const canGenerate = itemCount >= 2;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: c.bg }]} edges={['top']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: c.border }]}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backBtn, { backgroundColor: c.surface, borderColor: c.border }]}
          >
            <Text style={[styles.backIcon, { color: c.text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: c.text }]}>New List</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Title Input */}
          <Animated.View entering={FadeInDown.delay(80).springify()}>
            <Text style={[styles.inputLabel, { color: c.textSub }]}>List Title</Text>
            <TextInput
              style={[styles.input, { backgroundColor: c.card, borderColor: c.border, color: c.text }]}
              placeholder="e.g. Grocery Run, Speech Points, Planets"
              placeholderTextColor={c.textMuted}
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
              maxLength={60}
            />
          </Animated.View>

          {/* Items Input */}
          <Animated.View entering={FadeInDown.delay(140).springify()} style={{ marginTop: 20 }}>
            <View style={styles.labelRow}>
              <Text style={[styles.inputLabel, { color: c.textSub }]}>Items to Memorize</Text>
              <Text style={[styles.countBadge, { color: itemCount >= 2 ? c.teal : c.textMuted }]}>
                {itemCount} item{itemCount !== 1 ? 's' : ''}
              </Text>
            </View>
            <TextInput
              style={[
                styles.input,
                styles.multilineInput,
                { backgroundColor: c.card, borderColor: c.border, color: c.text },
              ]}
              placeholder={'One item per line:\nMilk\nEggs\nBread\nButter'}
              placeholderTextColor={c.textMuted}
              value={itemsText}
              onChangeText={setItemsText}
              multiline
              textAlignVertical="top"
              maxLength={2000}
            />
            {itemCount > 0 && itemCount < 2 && (
              <Text style={[styles.hint, { color: c.textMuted }]}>
                Add at least 2 items to generate mnemonics
              </Text>
            )}
          </Animated.View>

          {/* Generate Button */}
          <Animated.View entering={FadeInDown.delay(200).springify()} style={{ marginTop: 24 }}>
            <Animated.View style={btnStyle}>
              <TouchableOpacity
                style={[
                  styles.generateBtn,
                  {
                    backgroundColor: canGenerate ? c.accent : c.surface,
                    borderColor: canGenerate ? c.accent : c.border,
                    shadowColor: c.accent,
                  },
                ]}
                onPress={handleGenerate}
                onPressIn={() => { btnScale.value = withSpring(0.96, { damping: 15 }); }}
                onPressOut={() => { btnScale.value = withSpring(1, { damping: 15 }); }}
                disabled={!canGenerate || generating}
                activeOpacity={0.9}
              >
                {generating ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text
                    style={[
                      styles.generateBtnText,
                      { color: canGenerate ? '#FFFFFF' : c.textMuted },
                    ]}
                  >
                    ✨ Generate Mnemonics
                  </Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          {/* Results */}
          {generated && (
            <Animated.View entering={FadeInUp.springify()} style={{ marginTop: 32 }}>
              <Text style={[styles.sectionTitle, { color: c.text }]}>
                🎉 Your Mnemonics
              </Text>
              <Text style={[styles.sectionSub, { color: c.textMuted }]}>
                {generated.items.length} items · tap a tab to explore
              </Text>

              {/* Tabs */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginTop: 14, marginBottom: 16 }}
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

              <MnemonicCard
                key={activeTab}
                type={activeTab}
                content={generated.mnemonics[activeTab]}
              />

              {/* Item preview */}
              <View style={[styles.itemsPreview, { backgroundColor: c.card, borderColor: c.border }]}>
                <Text style={[styles.itemsPreviewLabel, { color: c.textMuted }]}>
                  📝 {generated.items.length} items
                </Text>
                <View style={styles.itemPills}>
                  {generated.items.map((item, i) => (
                    <View key={i} style={[styles.itemPill, { backgroundColor: c.surface, borderColor: c.border }]}>
                      <Text style={[styles.itemPillText, { color: c.textSub }]}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Save Button */}
              <TouchableOpacity
                style={[styles.saveBtn, { backgroundColor: c.teal, shadowColor: c.teal }]}
                onPress={handleSave}
                disabled={saving}
                activeOpacity={0.85}
              >
                {saving ? (
                  <ActivityIndicator color="#000" size="small" />
                ) : (
                  <Text style={styles.saveBtnText}>💾 Save List</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
          )}

          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>
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
  headerTitle: { fontSize: 18, fontWeight: '700', letterSpacing: 0.2 },
  content: { padding: 20, paddingBottom: 40 },
  inputLabel: { fontSize: 13, fontWeight: '600', marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  countBadge: { fontSize: 13, fontWeight: '700' },
  input: {
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '400',
  },
  multilineInput: { minHeight: 140, paddingTop: 14 },
  hint: { fontSize: 12, marginTop: 6 },
  generateBtn: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  generateBtnText: { fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },
  sectionTitle: { fontSize: 20, fontWeight: '800', letterSpacing: -0.3 },
  sectionSub: { fontSize: 13, marginTop: 4 },
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
  itemsPreview: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    marginTop: 16,
  },
  itemsPreviewLabel: { fontSize: 12, fontWeight: '600', marginBottom: 10, letterSpacing: 0.4, textTransform: 'uppercase' },
  itemPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  itemPill: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  itemPillText: { fontSize: 13, fontWeight: '500' },
  saveBtn: {
    marginTop: 20,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  saveBtnText: { fontSize: 16, fontWeight: '700', color: '#0A0A1B', letterSpacing: 0.3 },
});
