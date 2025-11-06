export interface StoryState<TProps> {
	readonly name: string;
	readonly props: TProps;
	readonly description: string;
}

export interface StoryBlueprint<TProps> {
	readonly component: string;
	readonly description: string;
	readonly states: ReadonlyArray<StoryState<TProps>>;
}
