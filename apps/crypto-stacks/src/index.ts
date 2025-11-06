import { Application, Container, Sprite } from 'pixi.js';
import { cryptoStacksMathConfig, validateGameMathConfig } from '@stakeengine/math-crypto-stacks';
import type { CryptoStacksContext, CryptoStacksGameOptions } from './types';
import { GameScene } from './reels/GameScene';
import { HUD } from './ui/HUD';
import { SpinButton } from './ui/SpinButton';

export interface CryptoStacksGame {
	readonly app: Application;
	readonly root: Container;
}

/**
 * Bootstraps a PixiJS application configured with the Crypto Stacks theme.
 * @param options Rendering options such as canvas handle and resolution.
 * @returns Running game instance with attached Pixi application.
 */
export async function initializeCryptoStacks(
	options: CryptoStacksGameOptions = {},
): Promise<CryptoStacksGame> {
	const validation = validateGameMathConfig(cryptoStacksMathConfig);
	if (!validation.valid) {
		throw new Error(`Invalid math config: ${validation.issues.join(', ')}`);
	}

	const app = new Application();
	await app.init({
		canvas: options.canvas,
		background: options.backgroundColor ?? 0x02101c,
		width: options.width ?? 1280,
		height: options.height ?? 720,
		antialias: true,
	});

	const context: CryptoStacksContext = {
		app,
		mathConfig: cryptoStacksMathConfig,
	};

	const root = buildSceneGraph(context);
	app.stage.addChild(root);

	return { app, root };
}

function buildSceneGraph(context: CryptoStacksContext): Container {
	const root = new Container();

	const background = new Sprite();
	background.tint = 0x04354a;
	background.width = context.app.view.width;
	background.height = context.app.view.height;
	root.addChild(background);

	const reels = new GameScene(context.mathConfig);
	reels.position.set(160, 96);
	root.addChild(reels);

	const hud = new HUD(context);
	hud.position.set(0, 0);
	hud.update({ balance: 1000, bet: 2, win: 0 });
	root.addChild(hud);

	const spinButton = new SpinButton({
		onClick: (): void => {
			spinButton.setState('loading');
			window.setTimeout(() => {
				spinButton.setState('idle');
			}, 400);
		},
	});
	spinButton.position.set(context.app.view.width - 200, context.app.view.height - 140);
	root.addChild(spinButton);

	return root;
}
