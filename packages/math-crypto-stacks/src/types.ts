export type SymbolTier = 'low' | 'mid' | 'premium' | 'wild' | 'scatter' | 'collectible';

export interface SymbolDefinition {
	readonly id: string;
	readonly displayName: string;
	readonly tier: SymbolTier;
	readonly assetKey: string;
	readonly description?: string;
}

export interface PaytableEntry {
	readonly symbol: string;
	readonly payouts: Readonly<Record<3 | 4 | 5, number>>;
}

export interface ReelStrip {
	readonly reelIndex: number;
	readonly symbols: ReadonlyArray<string>;
}

export interface BuyFeatureOption {
	readonly spins: number;
	readonly costMultiplier: number;
}

export interface FreeSpinConfig {
	readonly triggerSpins: Readonly<Record<3 | 4 | 5, number>>;
	readonly retriggerTwoScatterSpins: number;
	readonly retriggerMultiScatterSpins: number;
	readonly maxFreeSpins: number;
	readonly upgradeThresholds: ReadonlyArray<number>;
	readonly wildMultiplierReels: ReadonlyArray<number>;
	readonly wildMultiplierValues: ReadonlyArray<number>;
	readonly buyFeatureOptions: ReadonlyArray<BuyFeatureOption>;
}

export interface RTPBand {
	readonly mode: 'default' | 'jurisdictional';
	readonly jurisdiction?: string;
	readonly rtp: number;
}

export interface GameMathConfig {
	readonly name: string;
	readonly reels: number;
	readonly rows: number;
	readonly ways: number;
	readonly volatility: 'high' | 'medium' | 'low';
	readonly baseStake: number;
	readonly symbols: ReadonlyArray<SymbolDefinition>;
	readonly paytable: ReadonlyArray<PaytableEntry>;
	readonly reelStrips: ReadonlyArray<ReelStrip>;
	readonly freeSpins: FreeSpinConfig;
	readonly rtpBands: ReadonlyArray<RTPBand>;
	readonly scatterSymbol: string;
	readonly wildSymbol: string;
	readonly collectibleSymbol: string;
}

export interface MathValidationResult {
	readonly valid: boolean;
	readonly issues: ReadonlyArray<string>;
}
