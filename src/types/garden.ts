export enum GardenStage {
  THRESHOLD = 'THRESHOLD',
  ECHOES = 'ECHOES',
  THE_BLOOM = 'THE_BLOOM',
}

export type BloomPhase = 'BUD' | 'FIRST_LIGHT' | 'BLOOM' | 'QUIET_GLOW';

export interface EchoCardData {
  id: string;
  label: string;
  title: string;
  content: string;
  iconType: 'gratitude' | 'impermanence' | 'acceptance';
}