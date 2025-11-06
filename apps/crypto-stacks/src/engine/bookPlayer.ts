import type { CryptoStacksContext } from '../types';

export interface BookEvent {
	readonly type: 'spinStart' | 'spinResult' | 'featureStart' | 'featureEnd' | 'collect' | 'payout';
	readonly payload?: Record<string, unknown>;
}

export interface BookPlaybackOptions {
	readonly events: ReadonlyArray<BookEvent>;
	readonly onEvent?: (event: BookEvent, context: CryptoStacksContext) => void;
}

/**
 * Lightweight book player used during development to verify math wiring.
 * @param context Running Pixi + math context for the game instance.
 * @param options Playback configuration for the provided event book.
 */
export function playBook(context: CryptoStacksContext, options: BookPlaybackOptions): void {
	options.events.forEach((event) => {
		options.onEvent?.(event, context);
	});
}
