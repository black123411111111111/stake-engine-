import type { Application } from 'pixi.js';
import type { GameMathConfig } from '@stakeengine/math-crypto-stacks';

export interface CryptoStacksGameOptions {
	readonly canvas?: HTMLCanvasElement;
	readonly width?: number;
	readonly height?: number;
	readonly backgroundColor?: number;
}

export interface CryptoStacksContext {
	readonly app: Application;
	readonly mathConfig: GameMathConfig;
}
