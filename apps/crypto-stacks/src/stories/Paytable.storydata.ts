import type { StoryBlueprint } from './StoryBlueprint';

export interface PaytableStoryProps {
	readonly page: number;
	readonly title: string;
}

export const PaytableStories: StoryBlueprint<PaytableStoryProps> = {
	component: 'Paytable',
	description: 'Paytable modal pages for symbol and feature descriptions.',
	states: [
		{
			name: 'Symbols',
			props: { page: 1, title: 'Symbol Values' },
			description: 'Displays low, mid, and premium symbol payouts.',
		},
		{
			name: 'Free Spins',
			props: { page: 2, title: 'Free Spins & Upgrades' },
			description: 'Explains collect mechanic and retriggers.',
		},
		{
			name: 'Buy Feature',
			props: { page: 3, title: 'Buy Feature Options' },
			description: 'Lists 8/15/20 free spin purchase prices.',
		},
	],
};
