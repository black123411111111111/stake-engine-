import type { StoryBlueprint } from './StoryBlueprint';

export interface ReelStoryProps {
	readonly description: string;
}

export const ReelStories: StoryBlueprint<ReelStoryProps> = {
	component: 'GameScene',
	description: 'Showcases stopped reels with upgraded symbols.',
	states: [
		{
			name: 'Base Grid',
			props: { description: 'Base symbol mix with lows and mids.' },
			description: 'Default strips before upgrades.',
		},
		{
			name: 'Upgraded',
			props: { description: 'Several low symbols upgraded to premium token.' },
			description: 'Late free spins view with high density premiums.',
		},
	],
};
