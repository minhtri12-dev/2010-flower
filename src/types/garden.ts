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

export type FlowerVariant = 'lily' | 'lily-bud' | 'lily-open';

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
    title: 'Always Love Your Life',
    message: "Whenever you feel down, try to think positively. The world is always full of small joys waiting for you.",
    tag: 'GOOD VIBES',
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
    message: 'More happy moments, more photos with more smiles, and more little things to look forward to.',
    tag: 'EVERYDAY JOY',
  },
];

export const SECRET_NOTE_TEXT = `Happy Vietnamese Women's Day! ♡

I know today is a busy day for you, so I wanted to make you something a little different, and I hope it brings a smile to your face.

This is a small corner, filled with flowers, little surprises, and a few wishes for you. I hope it brings a smile to your face, because you look very lovely when you smile.

I hope you always have reasons to be happy, people who appreciate you, and beautiful things waiting around the corner.

And to be honest, I'm really happy every time I get to go out and watch movies with you.

Have a lovely October 20th. Remember to eat well, take good care of your health, and always stay happy and joyful ^^`;

export const SECRET_SIGNATURE = 'Made with care, just for you, Ly.';

export const FLOWER_COLOR_THEMES: FlowerColorTheme[] = [
  {
    id: 'dusty-rose-lily',
    primary: '#DFA89B',
    secondary: '#FFFDF9',
    core: '#D3B77A',
    glow: 'rgba(223, 168, 155, 0.35)',
  },
  {
    id: 'sage-cream-lily',
    primary: '#F2D6CE',
    secondary: '#FFFDF9',
    core: '#D3B77A',
    glow: 'rgba(242, 214, 206, 0.35)',
  },
  {
    id: 'peach-gold-lily',
    primary: '#E5B8AE',
    secondary: '#FFFDF9',
    core: '#D3B77A',
    glow: 'rgba(229, 184, 174, 0.35)',
  },
  {
    id: 'ivory-pure-lily',
    primary: '#FFFDF9',
    secondary: '#F2D6CE',
    core: '#7B8870',
    glow: 'rgba(255, 253, 249, 0.4)',
  },
];

export const GARDEN_STAGES: StageMetadata[] = [
  {
    id: 'welcome',
    stepNumber: '01',
    label: 'Welcome',
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
    label: 'Secret Note',
    subtitle: 'A sincere message tucked beneath the leaves',
  },
  {
    id: 'final-surprise',
    stepNumber: '05',
    label: 'One Last Surprise',
    subtitle: 'A keepsake bloom to carry with you',
  },
];