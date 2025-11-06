import { Container, Graphics, Text } from 'pixi.js';
import type { GameMathConfig } from '@stakeengine/math-crypto-stacks';

interface SymbolSlot {
	readonly frame: Graphics;
	readonly label: Text;
}

/**
 * Simple reel scene showing a static representation of the 5x4 grid.
 */
export class GameScene extends Container {
	private readonly slots: SymbolSlot[] = [];

	public constructor(mathConfig: GameMathConfig) {
		super();
		const symbolSize = 160;
		const padding = 8;

		for (let reel = 0; reel < mathConfig.reels; reel += 1) {
			for (let row = 0; row < mathConfig.rows; row += 1) {
				const slot = this.createSlot(symbolSize);
				slot.frame.position.set(reel * (symbolSize + padding), row * (symbolSize + padding));
				slot.label.text = this.resolveSymbolLabel(mathConfig, reel, row);
				this.addChild(slot.frame, slot.label);
				this.slots.push(slot);
			}
		}
	}

	private createSlot(size: number): SymbolSlot {
		const frame = new Graphics();
		frame.roundRect(0, 0, size, size, 24);
		frame.stroke({ color: 0x0bffdd, width: 4, alpha: 0.75 });
		frame.fill({ color: 0x041a24, alpha: 0.85 });

		const label = new Text({
			text: '',
			style: { fill: 0xfff1a8, fontSize: 32, align: 'center' },
		});
		label.anchor.set(0.5);
		label.position.set(size / 2, size / 2);

		return { frame, label };
	}

	private resolveSymbolLabel(mathConfig: GameMathConfig, reel: number, row: number): string {
		const strip = mathConfig.reelStrips[reel];
		const symbolId = strip.symbols[row % strip.symbols.length];
		const symbol = mathConfig.symbols.find((entry) => entry.id === symbolId);
		return symbol?.displayName ?? symbolId;
	}
}
