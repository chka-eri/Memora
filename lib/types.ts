export interface MnemonicList {
  id: string;
  title: string;
  items: string[];
  mnemonics: {
    acronym: string;
    story: string;
    rhyme: string;
    palace: string;
  };
  createdAt: string;
  lastReviewed: string | null;
  reviewHistory: string[];
  mastered: boolean;
}

export type MnemonicType = 'acronym' | 'story' | 'rhyme' | 'palace';
