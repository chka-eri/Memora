export const STORY_ADJECTIVES = [
  'gigantic', 'tiny', 'glowing', 'dancing', 'singing', 'purple', 'golden',
  'crystal', 'electric', 'fuzzy', 'bouncing', 'exploding', 'melting', 'spinning',
  'invisible', 'rainbow', 'flaming', 'icy', 'magnetic', 'floating',
  'sparkling', 'thundering', 'whispering', 'roaring', 'mystical', 'neon',
  'enormous', 'microscopic', 'ancient', 'futuristic',
];

export const STORY_CONNECTORS = [
  'crashes into', 'dances with', 'eats', 'throws',
  'transforms into', 'chases', 'explodes onto', 'flies over',
  'sings to', 'builds a house from', 'paints', 'marries',
  'wrestles', 'befriends', 'secretly steals',
];

export const LETTER_WORDS: Record<string, string[]> = {
  A: ['Apple', 'Alligator', 'Astronaut', 'Avocado', 'Anchor'],
  B: ['Banana', 'Butterfly', 'Bear', 'Balloon', 'Bakery'],
  C: ['Cat', 'Castle', 'Candle', 'Crown', 'Comet'],
  D: ['Dragon', 'Diamond', 'Dolphin', 'Drum', 'Dagger'],
  E: ['Elephant', 'Eagle', 'Emerald', 'Echo', 'Engine'],
  F: ['Fox', 'Fountain', 'Feather', 'Flame', 'Forest'],
  G: ['Giant', 'Galaxy', 'Gorilla', 'Garden', 'Globe'],
  H: ['Hero', 'Hammer', 'Heart', 'Honey', 'Hurricane'],
  I: ['Island', 'Iceberg', 'Igloo', 'Ivy', 'Inferno'],
  J: ['Jaguar', 'Jewel', 'Journey', 'Jupiter', 'Jungle'],
  K: ['Knight', 'Kingdom', 'Kettle', 'Kite', 'Koala'],
  L: ['Lion', 'Lighthouse', 'Lightning', 'Lava', 'Legend'],
  M: ['Mango', 'Mountain', 'Moon', 'Magic', 'Marvel'],
  N: ['Ninja', 'Nova', 'Neptune', 'Nebula', 'Night'],
  O: ['Ocean', 'Oracle', 'Oasis', 'Orbit', 'Otter'],
  P: ['Phoenix', 'Palace', 'Planet', 'Pyramid', 'Panda'],
  Q: ['Queen', 'Quest', 'Quantum', 'Quartz', 'Quill'],
  R: ['Rainbow', 'Rocket', 'River', 'Ruby', 'Robot'],
  S: ['Star', 'Storm', 'Sphinx', 'Shield', 'Serpent'],
  T: ['Tiger', 'Thunder', 'Treasure', 'Tower', 'Temple'],
  U: ['Universe', 'Unicorn', 'Umbrella', 'Ultra', 'Utopia'],
  V: ['Volcano', 'Viking', 'Vortex', 'Violet', 'Victory'],
  W: ['Wizard', 'Waterfall', 'Wolf', 'Warrior', 'Wings'],
  X: ['Xenon', 'Xavier', 'Xylophone', 'X-ray', 'Xenith'],
  Y: ['Yeti', 'Yacht', 'Yonder', 'Yarn', 'Yellow'],
  Z: ['Zebra', 'Zenith', 'Zephyr', 'Zeus', 'Zombie'],
};

export const PALACE_ROOMS = [
  { emoji: '🚪', name: 'Front Door' },
  { emoji: '🏠', name: 'Hallway' },
  { emoji: '🛋️', name: 'Living Room' },
  { emoji: '🍳', name: 'Kitchen' },
  { emoji: '🍽️', name: 'Dining Room' },
  { emoji: '🛏️', name: 'Bedroom' },
  { emoji: '🚿', name: 'Bathroom' },
  { emoji: '📚', name: 'Study' },
  { emoji: '🌿', name: 'Garden' },
  { emoji: '🚗', name: 'Garage' },
  { emoji: '🏚️', name: 'Attic' },
  { emoji: '🔦', name: 'Basement' },
];

export const RHYME_PATTERNS: Array<(item: string) => string> = [
  (item) => `${item}, ${item}, so fine and neat,\ndancing to a funky beat`,
  (item) => `Here comes ${item}, wild and free,\nhanging from the tallest tree`,
  (item) => `${item} shines so bright today,\nlighting up the Milky Way`,
  (item) => `Round and round goes ${item},\nbouncing like a ball at play`,
  (item) => `${item} in the morning light,\nwaving left and waving right`,
  (item) => `Oh the magical ${item},\nfloating in the purple sky`,
  (item) => `${item} went to see the queen,\nbiggest one you've ever seen`,
  (item) => `Hip hop hip, here's your ${item},\ndoing backflips on a ship`,
  (item) => `${item} loves to run and leap,\nand count the stars before you sleep`,
  (item) => `In the land of ${item} and more,\nno one's ever kept a score`,
];
