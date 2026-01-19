export interface Persona {
  id: string;
  title: string;
  tagline: string;
  description?: string;
  imageUrl: string;
  themeColor: string;
  bgGradient: string;
  prompt: string;
}

export interface SectionProps {
  className?: string;
}

export enum Side {
  APP = 'APP',
  OS = 'OS'
}