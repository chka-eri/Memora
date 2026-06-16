import React, { useMemo } from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  reviewHistory: string[];
  mastered: boolean;
}

const WEEKS = 15;
const DAYS = 7;
const CELL = 14;
const GAP = 3;
const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export default function HeatMap({ reviewHistory, mastered }: Props) {
  const isDark = useColorScheme() === 'dark';
  const c = isDark ? Colors.dark : Colors.light;

  const reviewSet = useMemo(() => new Set(reviewHistory), [reviewHistory]);

  const cells = useMemo(() => {
    const total = WEEKS * DAYS;
    const today = new Date();
    const result: Array<{ date: string; reviewed: boolean }> = [];
    for (let i = total - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      result.push({ date: dateStr, reviewed: reviewSet.has(dateStr) });
    }
    return result;
  }, [reviewSet]);

  const weeks = useMemo(() => {
    const w: Array<typeof cells> = [];
    for (let i = 0; i < WEEKS; i++) {
      w.push(cells.slice(i * DAYS, (i + 1) * DAYS));
    }
    return w;
  }, [cells]);

  const getCellColor = (reviewed: boolean) => {
    if (!reviewed) return isDark ? '#1E1E38' : '#E8E8F8';
    return mastered ? c.gold : c.teal;
  };

  const totalReviews = reviewHistory.length;
  const streak = useMemo(() => {
    let s = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (reviewSet.has(dateStr)) s++;
      else break;
    }
    return s;
  }, [reviewSet]);

  return (
    <View style={[styles.container, { backgroundColor: c.card, borderColor: c.border }]}>
      <Text style={[styles.title, { color: c.text }]}>📅 Review History</Text>

      <View style={styles.stats}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: c.accent }]}>{totalReviews}</Text>
          <Text style={[styles.statLabel, { color: c.textMuted }]}>total</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: c.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: c.teal }]}>{streak}</Text>
          <Text style={[styles.statLabel, { color: c.textMuted }]}>streak</Text>
        </View>
        {mastered && (
          <>
            <View style={[styles.statDivider, { backgroundColor: c.border }]} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: c.gold }]}>⭐</Text>
              <Text style={[styles.statLabel, { color: c.textMuted }]}>mastered</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.dayRow}>
        {DAY_LABELS.map((d, i) => (
          <Text key={i} style={[styles.dayLabel, { color: c.textMuted, width: CELL + GAP }]}>
            {d}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {weeks.map((week, wi) => (
          <View key={wi} style={styles.weekCol}>
            {week.map((day, di) => (
              <View
                key={di}
                style={[
                  styles.cell,
                  {
                    backgroundColor: getCellColor(day.reviewed),
                    width: CELL,
                    height: CELL,
                    marginBottom: GAP,
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.legend}>
        <View style={[styles.legendCell, { backgroundColor: isDark ? '#1E1E38' : '#E8E8F8' }]} />
        <Text style={[styles.legendLabel, { color: c.textMuted }]}>none</Text>
        <View style={[styles.legendCell, { backgroundColor: c.teal }]} />
        <Text style={[styles.legendLabel, { color: c.textMuted }]}>reviewed</Text>
        <View style={[styles.legendCell, { backgroundColor: c.gold }]} />
        <Text style={[styles.legendLabel, { color: c.textMuted }]}>mastered</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  dayRow: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingLeft: 2,
  },
  dayLabel: {
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    gap: GAP,
  },
  weekCol: {
    flexDirection: 'column',
  },
  cell: {
    borderRadius: 3,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    gap: 6,
  },
  legendCell: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
  legendLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginRight: 8,
  },
});
