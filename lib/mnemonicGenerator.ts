import {
  LETTER_WORDS,
  PALACE_ROOMS,
  STORY_ADJECTIVES,
  STORY_CONNECTORS,
  RHYME_PATTERNS,
} from '../constants/wordBank';

function deterministicIndex(seed: number, arrayLen: number, offset: number): number {
  return Math.abs((seed * 31 + offset * 17) % arrayLen);
}

export function generateAcronym(items: string[]): string {
  if (items.length === 0) return '';

  const letters = items.map((item) => {
    const ch = item.trim().replace(/[^a-zA-Z]/g, '')[0]?.toUpperCase();
    return ch || '?';
  });

  const seed = items.reduce((acc, s) => acc + s.charCodeAt(0), 0);

  const mnemonicWords = letters.map((letter, i) => {
    const wordList = LETTER_WORDS[letter] ?? LETTER_WORDS['A'];
    return wordList[deterministicIndex(seed, wordList.length, i)];
  });

  const acronym = letters.join('');
  const phrase = mnemonicWords.join(' ');

  return `${acronym}\n\n"${phrase}"`;
}

export function generateStory(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) {
    return `🎬 Picture a glowing ${items[0].toUpperCase()} surfing through outer space on a comet! 🚀`;
  }

  const seed = items.reduce((acc, s) => acc + s.length, 0);
  const getAdj = (i: number) =>
    STORY_ADJECTIVES[deterministicIndex(seed, STORY_ADJECTIVES.length, i)];
  const getConn = (i: number) =>
    STORY_CONNECTORS[deterministicIndex(seed, STORY_CONNECTORS.length, i)];

  let story = `🎬 A ${getAdj(0)} ${items[0].toUpperCase()}`;

  for (let i = 1; i < items.length; i++) {
    story += ` ${getConn(i)} a ${getAdj(i)} ${items[i].toUpperCase()}`;
  }

  story += '. The end! 🎭';

  return story;
}

export function generateRhyme(items: string[]): string {
  if (items.length === 0) return '';

  const seed = items.reduce((acc, s) => acc + s.charCodeAt(0), 0);

  return items
    .map((item, i) => {
      const pattern = RHYME_PATTERNS[deterministicIndex(seed, RHYME_PATTERNS.length, i)];
      return `🎵 ${pattern(item)}`;
    })
    .join('\n\n');
}

export function generatePalace(items: string[]): string {
  if (items.length === 0) return '';

  const seed = items.reduce((acc, s) => acc + s.length, 0);

  return items
    .map((item, i) => {
      const room = PALACE_ROOMS[i % PALACE_ROOMS.length];
      const adj = STORY_ADJECTIVES[deterministicIndex(seed, STORY_ADJECTIVES.length, i)];
      return `${room.emoji} ${room.name.toUpperCase()}\nA ${adj} ${item.toUpperCase()} dominates this room.`;
    })
    .join('\n\n');
}

export function generateAllMnemonics(items: string[]) {
  return {
    acronym: generateAcronym(items),
    story: generateStory(items),
    rhyme: generateRhyme(items),
    palace: generatePalace(items),
  };
}
