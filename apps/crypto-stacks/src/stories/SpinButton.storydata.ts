import type { StoryBlueprint } from './StoryBlueprint';
import type { SpinButtonState } from '../ui/SpinButton';

export interface SpinButtonStoryProps {
	readonly state: SpinButtonState;
}

export const SpinButtonStories: StoryBlueprint<SpinButtonStoryProps> = {
	component: 'SpinButton',
	description: 'Hexagonal neon spin button for initiating spins.',
	states: [
		{ name: 'Idle', props: { state: 'idle' }, description: 'Default ready state.' },
		{ name: 'Pressed', props: { state: 'pressed' }, description: 'Pointer pressed feedback.' },
		{
			name: 'Disabled',
			props: { state: 'disabled' },
			description: 'Disabled when actions are locked.',
		},
		{
			name: 'Loading',
			props: { state: 'loading' },
			description: 'Displays during rapid-resolve spins.',
		},
	],
};
