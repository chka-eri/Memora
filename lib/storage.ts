import * as SecureStore from 'expo-secure-store';
import { MnemonicList } from './types';

const STORAGE_KEY = 'memora_lists_v1';

export async function getAllLists(): Promise<MnemonicList[]> {
  try {
    const data = await SecureStore.getItemAsync(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as MnemonicList[];
  } catch {
    return [];
  }
}

export async function saveList(list: MnemonicList): Promise<void> {
  const lists = await getAllLists();
  const idx = lists.findIndex((l) => l.id === list.id);
  if (idx >= 0) {
    lists[idx] = list;
  } else {
    lists.unshift(list);
  }
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(lists));
}

export async function deleteList(id: string): Promise<void> {
  const lists = await getAllLists();
  const filtered = lists.filter((l) => l.id !== id);
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(filtered));
}

export async function recordReview(id: string): Promise<void> {
  const lists = await getAllLists();
  const idx = lists.findIndex((l) => l.id === id);
  if (idx < 0) return;
  const today = new Date().toISOString().split('T')[0];
  lists[idx].lastReviewed = today;
  if (!lists[idx].reviewHistory.includes(today)) {
    lists[idx].reviewHistory.push(today);
  }
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(lists));
}

export async function setMastered(id: string): Promise<void> {
  const lists = await getAllLists();
  const idx = lists.findIndex((l) => l.id === id);
  if (idx < 0) return;
  const today = new Date().toISOString().split('T')[0];
  lists[idx].mastered = true;
  lists[idx].lastReviewed = today;
  if (!lists[idx].reviewHistory.includes(today)) {
    lists[idx].reviewHistory.push(today);
  }
  await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(lists));
}
