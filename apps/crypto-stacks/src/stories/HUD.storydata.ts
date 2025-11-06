import type { StoryBlueprint } from './StoryBlueprint';

export interface HUDStoryProps {
	readonly balance: number;
	readonly bet: number;
	readonly win: number;
	readonly freeSpinsRemaining?: number;
}

export const HUDStories: StoryBlueprint<HUDStoryProps> = {
	component: 'HUD',
	description: 'Displays balance, bet, win, and feature counters.',
	states: [
		{
			name: 'Base Game',
			props: { balance: 1000, bet: 2, win: 0 },
			description: 'Default state before a spin.',
		},
		{
			name: 'Feature Win',
			props: { balance: 1240, bet: 2, win: 150, freeSpinsRemaining: 6 },
			description: 'Free spins run with progressive win counter.',
		},
	],
};
