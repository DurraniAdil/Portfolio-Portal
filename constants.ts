import { Persona } from './types';

export const PERSONAS: Persona[] = [
  {
    id: 'poet',
    title: 'The Poet',
    tagline: 'Weaving words into worlds.',
    imageUrl: '/media/poet.png',
    themeColor: '#ec4899', // Pink vibe
    bgGradient: 'from-pink-900 via-slate-900 to-black',
    prompt: '',
  },
  {
    id: 'hrpm',
    title: 'The Manager',
    tagline: 'Orchestrating people and potential.',
    imageUrl: '/media/manager.png',
    themeColor: '#eab308', // Yellow vibe
    bgGradient: 'from-yellow-900 via-slate-900 to-black',
    prompt: '',
  },
  {
    id: 'webdev',
    title: 'The Web Developer',
    tagline: 'Building the digital frontier.',
    imageUrl: '/media/developer.png',
    themeColor: '#22c55e', // Green vibe
    bgGradient: 'from-green-900 via-slate-900 to-black',
    prompt: '',
  }
];

export const LINKS = {
  APP_PORTFOLIO: 'https://durraniadil.github.io/Portfolio-App/',
  OS_PORTFOLIO: 'https://durraniadil.github.io/Portfolio-OS/',
};

export const SECTION_TRANSITION_DURATION = 0.8;
export const SLIDE_DURATION = 7000; //seven seconds 