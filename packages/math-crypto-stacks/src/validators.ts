import { z } from 'zod';
import type { GameMathConfig, MathValidationResult } from './types';

export const buyFeatureOptionSchema = z.object({
	spins: z.number().int().min(1),
	costMultiplier: z.number().positive(),
});

export const freeSpinSchema = z.object({
	triggerSpins: z.object({
		3: z.number().int().min(1),
		4: z.number().int().min(1),
		5: z.number().int().min(1),
	}),
	retriggerTwoScatterSpins: z.number().int().min(1),
	retriggerMultiScatterSpins: z.number().int().min(1),
	maxFreeSpins: z.number().int().min(1),
	upgradeThresholds: z.array(z.number().int().min(1)).min(1),
	wildMultiplierReels: z.array(z.number().int().min(1)).min(1),
	wildMultiplierValues: z.array(z.number().int().min(2)).min(1),
	buyFeatureOptions: z.array(buyFeatureOptionSchema).min(1),
});

export const symbolDefinitionSchema = z.object({
	id: z.string().min(1),
	displayName: z.string().min(1),
	tier: z.enum(['low', 'mid', 'premium', 'wild', 'scatter', 'collectible']),
	assetKey: z.string().min(1),
	description: z.string().optional(),
});

export const paytableEntrySchema = z.object({
	symbol: z.string().min(1),
	payouts: z.object({
		3: z.number().nonnegative(),
		4: z.number().nonnegative(),
		5: z.number().nonnegative(),
	}),
});

export const reelStripSchema = z.object({
	reelIndex: z.number().int().min(0),
	symbols: z.array(z.string().min(1)).min(1),
});

export const rtpBandSchema = z.object({
	mode: z.enum(['default', 'jurisdictional']),
	jurisdiction: z.string().optional(),
	rtp: z.number().min(0.8).max(1),
});

export const gameMathConfigSchema = z.object({
	name: z.string().min(1),
	reels: z.number().int().min(1),
	rows: z.number().int().min(1),
	ways: z.number().int().min(1),
	volatility: z.enum(['high', 'medium', 'low']),
	baseStake: z.number().positive(),
	symbols: z.array(symbolDefinitionSchema).min(1),
	paytable: z.array(paytableEntrySchema).min(1),
	reelStrips: z.array(reelStripSchema).min(1),
	freeSpins: freeSpinSchema,
	rtpBands: z.array(rtpBandSchema).min(1),
	scatterSymbol: z.string().min(1),
	wildSymbol: z.string().min(1),
	collectibleSymbol: z.string().min(1),
});

/**
 * Validate a math configuration instance to guard runtime integration.
 * @param config Candidate configuration object.
 * @returns Structured validation result with human readable issues.
 */
export function validateGameMathConfig(config: GameMathConfig): MathValidationResult {
	const validation = gameMathConfigSchema.safeParse(config);
	if (validation.success) {
		return { valid: true, issues: [] };
	}

	const issues = validation.error.issues.map((issue) => issue.message);
	return { valid: false, issues };
}
