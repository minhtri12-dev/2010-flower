export type StageId =
  | 'welcome'
  | 'garden'
  | 'wishes'
  | 'secret-note'
  | 'final-surprise';

export interface StageMetadata {
  id: StageId;
  stepNumber: string;
  label: string;
  subtitle: string;
}

export type FlowerVariant = 'camellia' | 'lotus' | 'cosmos' | 'bellflower';

export interface FlowerColorTheme {
  id: string;
  primary: string;
  secondary: string;
  core: string;
  glow: string;
}

export interface PlantedFlower {
  id: string;
  xPercent: number;
  yPercent: number;
  variant: FlowerVariant;
  scale: number;
  rotation: number;
  stemHeight: number;
  stemCurve: number;
  colorTheme: FlowerColorTheme;
  createdAt: number;
}

export interface WishCardData {
  id: string;
  title: string;
  message: string;
  tag: string;
}

export const WISH_CARDS: WishCardData[] = [
  {
    id: 'wish-1',
    title: 'Keep Being You',
    message: "There's something lovely about the way you see the world. Never lose that.",
    tag: 'PERSPECTIVE',
  },
  {
    id: 'wish-2',
    title: 'Make Time for Yourself',
    message: 'Even on the busiest days, I hope you find a little time to rest and do what makes you happy.',
    tag: 'REST & BALANCE',
  },
  {
    id: 'wish-3',
    title: 'You Deserve Good Things',
    message: 'More happy moments, more exciting adventures, and more little things to look forward to.',
    tag: 'EVERYDAY JOY',
  },
];

export const SECRET_NOTE_TEXT = `Happy Vietnamese Women's Day! ♡

I know today is a busy day for both of us, so I wanted to make you something a little different.

It's just a small corner of the internet, filled with flowers, little surprises, and a few wishes for you. I hope it brings a smile to your face, even if just for a moment.

I hope you always have reasons to be happy, people who appreciate you, and beautiful things waiting around the corner.

And honestly, I'm really glad I got to know you.

Have a lovely October 20th. Take good care of yourself, and keep smiling!`;

export const SECRET_SIGNATURE = 'Made with care, just for you.';

export const FLOWER_COLOR_THEMES: FlowerColorTheme[] = [
  {
    id: 'dusty-rose',
    primary: '#DFA89B',
    secondary: '#FFFDF9',
    core: '#D3B77A',
    glow: 'rgba(223, 168, 155, 0.35)',
  },
  {
    id: 'sage-ivory',
    primary: '#A8B59A',
    secondary: '#FFFDF9',
    core: '#D3B77A',
    glow: 'rgba(168, 181, 154, 0.35)',
  },
  {
    id: 'honey-cream',
    primary: '#D3B77A',
    secondary: '#DFA89B',
    core: '#7B8870',
    glow: 'rgba(211, 183, 122, 0.35)',
  },
  {
    id: 'botanical-pink',
    primary: '#E5B8AE',
    secondary: '#A8B59A',
    core: '#D3B77A',
    glow: 'rgba(229, 184, 174, 0.35)',
  },
];

export const GARDEN_STAGES: StageMetadata[] = [
  {
    id: 'welcome',
    stepNumber: '01',
    label: 'The Welcome',
    subtitle: 'A quiet threshold into the evening garden',
  },
  {
    id: 'garden',
    stepNumber: '02',
    label: 'The Garden',
    subtitle: 'Interactive botanical blooms awaiting your touch',
  },
  {
    id: 'wishes',
    stepNumber: '03',
    label: 'Little Wishes',
    subtitle: 'Thoughtful notes gathered for October 20th',
  },
  {
    id: 'secret-note',
    stepNumber: '04',
    label: 'The Secret Note',
    subtitle: 'A sincere message tucked beneath the leaves',
  },
  {
    id: 'final-surprise',
    stepNumber: '05',
    label: 'One Last Surprise',
    subtitle: 'A keepsake bloom to carry with you',
  },
];