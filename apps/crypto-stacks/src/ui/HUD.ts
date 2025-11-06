import { Container, Graphics, Text } from 'pixi.js';
import type { CryptoStacksContext } from '../types';

export interface HUDState {
	readonly balance: number;
	readonly bet: number;
	readonly win: number;
	readonly freeSpinsRemaining?: number;
}

/**
 * Heads-up display overlay that renders balance, bet, and win text.
 */
export class HUD extends Container {
	private readonly background: Graphics;

	private readonly balanceText: Text;

	private readonly betText: Text;

	private readonly winText: Text;

	private readonly freeSpinsText: Text;

	public constructor(context: CryptoStacksContext) {
		super();
		this.background = new Graphics();
		this.balanceText = new Text({ text: 'Balance 0', style: { fill: 0xe0f7ff } });
		this.betText = new Text({ text: 'Bet 0', style: { fill: 0xe0f7ff } });
		this.winText = new Text({ text: 'Win 0', style: { fill: 0xfff1a8 } });
		this.freeSpinsText = new Text({ text: 'Free Spins', style: { fill: 0xffc857 } });

		this.background.roundRect(0, 0, context.app.view.width, 72, 16);
		this.background.fill({ color: 0x021b2c, alpha: 0.9 });
		this.balanceText.position.set(24, 16);
		this.betText.position.set(264, 16);
		this.winText.position.set(504, 16);
		this.freeSpinsText.position.set(744, 16);

		this.addChild(
			this.background,
			this.balanceText,
			this.betText,
			this.winText,
			this.freeSpinsText,
		);
	}

	/**
	 * Update HUD text fields to match the latest state from math events.
	 * @param state Current wallet, stake, and feature counters.
	 */
	public update(state: HUDState): void {
		this.balanceText.text = `Balance ${state.balance.toFixed(2)}`;
		this.betText.text = `Bet ${state.bet.toFixed(2)}`;
		this.winText.text = `Win ${state.win.toFixed(2)}`;
		if (typeof state.freeSpinsRemaining === 'number') {
			this.freeSpinsText.visible = true;
			this.freeSpinsText.text = `Free Spins ${state.freeSpinsRemaining}`;
		} else {
			this.freeSpinsText.visible = false;
		}
	}
}
