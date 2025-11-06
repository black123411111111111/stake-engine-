import type { StoryBlueprint } from './StoryBlueprint';

export interface WinBannerStoryProps {
	readonly label: string;
	readonly winAmount: number;
}

export const WinBannerStories: StoryBlueprint<WinBannerStoryProps> = {
	component: 'WinBanner',
	description: 'Animated win banner states for various win tiers.',
	states: [
		{
			name: 'Small Win',
			props: { label: 'Crypto Spark', winAmount: 12 },
			description: 'Small celebration for minor base win.',
		},
		{
			name: 'Medium Win',
			props: { label: 'Vault Surge', winAmount: 120 },
			description: 'Mid-tier celebration triggered in free spins.',
		},
		{
			name: 'Big Win',
			props: { label: 'Meta Vault Mega', winAmount: 1200 },
			description: 'Full burst neon celebration for big wins.',
		},
	],
};
