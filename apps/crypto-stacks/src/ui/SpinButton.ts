import { Container, Graphics, Text } from 'pixi.js';

export type SpinButtonState = 'idle' | 'pressed' | 'disabled' | 'loading';

export interface SpinButtonOptions {
	readonly onClick?: () => void;
}

/**
 * Neon hexagonal spin button for the Crypto Stacks game.
 */
export class SpinButton extends Container {
	private readonly background: Graphics;

	private readonly caption: Text;

	private state: SpinButtonState = 'idle';

	public constructor(options: SpinButtonOptions = {}) {
		super();
		this.eventMode = 'static';
		this.cursor = 'pointer';
		this.background = new Graphics();
		this.caption = new Text({ text: 'SPIN', style: { fill: 0x0bffdd, fontSize: 32 } });
		this.caption.anchor.set(0.5);
		this.caption.position.set(0, 0);

		this.drawBackground();
		this.addChild(this.background, this.caption);

		if (options.onClick) {
			this.on('pointertap', () => {
				if (this.state === 'disabled' || this.state === 'loading') {
					return;
				}
				options.onClick?.();
			});
		}
	}

	/**
	 * Set the button state and redraw the neon styling accordingly.
	 * @param nextState Desired button state.
	 */
	public setState(nextState: SpinButtonState): void {
		this.state = nextState;
		this.drawBackground();
	}

	private drawBackground(): void {
		const palette: Record<SpinButtonState, number> = {
			idle: 0x0bffdd,
			pressed: 0x12b5ff,
			disabled: 0x1f3350,
			loading: 0xffc857,
		};

		const border: Record<SpinButtonState, number> = {
			idle: 0x1dffe0,
			pressed: 0x54c5ff,
			disabled: 0x365272,
			loading: 0xf5a623,
		};

		this.background.clear();
		this.background.stroke({ width: 4, color: border[this.state] });
		this.background.fill(palette[this.state], this.state === 'disabled' ? 0.4 : 0.9);
		this.background.drawPolygon([-96, 0, -48, -72, 48, -72, 96, 0, 48, 72, -48, 72]);
		this.background.endFill();
		this.background.filters = [];
		if (this.state === 'idle' || this.state === 'pressed') {
			this.background.alpha = 1;
		} else if (this.state === 'loading') {
			this.background.alpha = 0.85;
		} else {
			this.background.alpha = 0.6;
		}
	}
}
