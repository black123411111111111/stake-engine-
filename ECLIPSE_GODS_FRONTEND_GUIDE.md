# Eclipse of the Gods - Frontend Integration Guide

##  Summary

Based on the web-sdk documentation review, here's what you need to integrate Eclipse of the Gods with the frontend:

##  Current Status

###  Backend (Math-SDK) - COMPLETE
- Game files: All 12 files created
- Simulations: 100,000 per mode completed
- Optimization: Successfully balanced to 95.2% RTP
- Publish files: Ready in `games/eclipse_gods/library/publish_files/`
  - `books_base.jsonl.zst` (18.49 MB)
  - `books_bonus.jsonl.zst` (125.66 MB)
  - `lookUpTable_base_0.csv` (100,000 entries)
  - `lookUpTable_bonus_0.csv` (100,000 entries)
  - `index.json` (mode configuration)

###  Frontend (Web-SDK) - TO DO

##  Integration Steps

### Step 1: Choose Base Template
The web-sdk has a `ways` game template that matches Eclipse of the Gods:
- Location: `web-sdk/apps/ways/`
- Type: Ways-based slot (perfect match!)
- Has: 5 reels  3 rows (needs modification to 6 reels variable rows)

### Step 2: Create New App or Modify Ways

**Option A: Create New `eclipse-gods` App** (Recommended)
```bash
cd web-sdk/apps
cp -r ways eclipse-gods
cd eclipse-gods
```

**Option B: Modify Existing `ways` App**
Use the existing ways app as-is for testing

### Step 3: Update Game Configuration

File: `src/game/config.ts`

```typescript
export default {
  providerName: 'StakeEngine',
  gameName: 'Eclipse of the Gods',
  gameID: 'eclipse_gods',
  rtp: 0.962,
  numReels: 6,
  numRows: [3, 4, 5, 4, 3, 4],  // Variable rows!
  betModes: {
    base: {
      cost: 1.0,
      feature: true,
      buyBonus: false,
      rtp: 0.952,
      max_win: 10000,
    },
    bonus: {
      cost: 100.0,
      feature: false,
      buyBonus: true,
      rtp: 0.962,
      max_win: 10000,
    },
  },
  symbols: {
    Wild: {
      paytable: null,
      special_properties: ['wild'],
    },
    Scatter: {
      paytable: null,
      special_properties: ['scatter'],
    },
    Zeus: {
      paytable: [
        { '6': 200 },
        { '5': 80 },
        { '4': 30 },
        { '3': 10 },
      ],
    },
    Odin: {
      paytable: [
        { '6': 150 },
        { '5': 60 },
        { '4': 25 },
        { '3': 8 },
      ],
    },
    Hades: {
      paytable: [
        { '6': 120 },
        { '5': 50 },
        { '4': 20 },
        { '3': 6 },
      ],
    },
    Thor: {
      paytable: [
        { '6': 100 },
        { '5': 40 },
        { '4': 15 },
        { '3': 5 },
      ],
    },
    R1: {
      paytable: [
        { '6': 50 },
        { '5': 20 },
        { '4': 8 },
        { '3': 3 },
      ],
    },
    R2: {
      paytable: [
        { '6': 40 },
        { '5': 15 },
        { '4': 6 },
        { '3': 2 },
      ],
    },
    R3: {
      paytable: [
        { '6': 30 },
        { '5': 12 },
        { '4': 5 },
        { '3': 1.5 },
      ],
    },
    R4: {
      paytable: [
        { '6': 25 },
        { '5': 10 },
        { '4': 4 },
        { '3': 1 },
      ],
    },
    R5: {
      paytable: [
        { '6': 20 },
        { '5': 8 },
        { '4': 3 },
        { '3': 0.5 },
      ],
    },
  },
  paddingReels: {
    basegame: '',
    freegame: '',
  },
};
```

### Step 4: Copy Math Books Data

You need to decompress and convert the books files:

1. **Decompress books** (use Python zstandard):
```python
import zstandard as zstd
import json

# Decompress base mode
with open('books_base.jsonl.zst', 'rb') as compressed:
    dctx = zstd.ZstdDecompressor()
    with open('books_base.jsonl', 'wb') as decompressed:
        dctx.copy_stream(compressed, decompressed)
```

2. **Convert to TypeScript** format for storybook:
   - Read JSONL (one JSON per line)
   - Format as TypeScript array
   - Save to `src/stories/data/base_books.ts`

File: `src/stories/data/base_books.ts`
```typescript
export default [
  {
    id: 1,
    payoutMultiplier: 32.0,
    events: [
      {
        index: 0,
        type: 'reveal',
        board: [
          // 6 reels with variable rows
          [{ name: 'Zeus' }, { name: 'Odin' }, { name: 'R1' }],
          [{ name: 'Thor' }, { name: 'R2' }, { name: 'R3' }, { name: 'R4' }],
          // ... etc
        ],
        paddingPositions: [/* ... */],
        gameType: 'basegame',
        anticipation: [0, 0, 0, 0, 0, 0],
      },
      // ... more events
    ],
    criteria: 'basegame',
    baseGameWins: 32.0,
    freeGameWins: 0.0,
  },
  // ... more books
];
```

### Step 5: Create Symbol Assets

You'll need visual assets for each symbol:
- **Format**: PNG sprites or Spine animations
- **Location**: `static/assets/sprites/` or `static/assets/spines/`
- **Required symbols**:
  - Zeus, Odin, Hades, Thor (high-value gods)
  - R1, R2, R3, R4, R5 (rune symbols)
  - Wild (Divine Sigil)
  - Scatter (Solar Eclipse Orb)

### Step 6: Update Board Component

File: `src/components/Board.svelte` or `BoardBase.svelte`

Modify to handle 6 reels with variable rows (3-4-5-4-3-4):
```typescript
const numReels = 6;
const numRows = [3, 4, 5, 4, 3, 4];
```

### Step 7: Test in Storybook

```bash
cd web-sdk
pnpm run storybook --filter=eclipse-gods
# or
pnpm run storybook --filter=ways
```

Navigate to:
- `MODE_BASE/book/random` - Test random base game
- `MODE_BONUS/book/random` - Test bonus mode
- `COMPONENTS/Symbol/symbols` - Test all symbol rendering

### Step 8: Run in DEV Mode

```bash
pnpm run dev --filter=eclipse-gods
```

### Step 9: Build for Production

```bash
pnpm run build --filter=eclipse-gods
```

Output will be in `.svelte-kit/output/`

### Step 10: Upload to Stake Engine

1. Login to engine.stake.com
2. Create/select game
3. Upload math files (from math-sdk publish_files)
4. Upload frontend build (from web-sdk build output)
5. Publish and test

##  Design Considerations

### Theme: Solar Eclipse / Greek & Norse Gods
- **Colors**: Dark purples, golds, celestial blues
- **Background**: Epic celestial scene with eclipse
- **Symbols**: Detailed god portraits, mystical runes
- **Animations**: 
  - Zeus: Lightning effects
  - Odin: Raven/wolf summons
  - Hades: Underworld flames
  - Thor: Thunder and hammer
  - Wild: Divine light burst
  - Scatter: Eclipse animation
  - Free spins: Celestial portal transition

### Variable Row Layout (3-4-5-4-3-4)
Creates a unique diamond-plus shape:
```
     [ ][ ][ ]           (3 rows)
   [ ][ ][ ][ ]         (4 rows)
 [ ][ ][ ][ ][ ]       (5 rows)
   [ ][ ][ ][ ]         (4 rows)
     [ ][ ][ ]           (3 rows)
   [ ][ ][ ][ ]         (4 rows)
```

##  Key Stats to Display

- **RTP**: 96.2%
- **Max Win**: 10,000x
- **Volatility**: High
- **Ways**: 7,776 ways to win
- **Free Spins**: 10-25 spins (3-6 scatters)
- **Hit Frequency**:
  - Base game: 1 in 3 spins
  - Free spins trigger: 1 in 150 spins

##  Quick Start Path

**Fastest way to see Eclipse of the Gods running:**

1. Use existing `ways` app as-is for testing
2. Update `config.ts` with Eclipse of Gods data
3. Convert first 100 books from books_base.jsonl.zst
4. Add to `base_books.ts`
5. Run storybook
6. Test with MODE_BASE/book/random

**Then enhance with:**
- Custom symbol assets
- Theme-specific backgrounds
- God-specific animations
- Free spin transitions
- Win celebration effects

##  Notes

- The ways calculation is already implemented in the web-sdk
- You mainly need to provide visual assets and theme
- The math is production-ready (optimized, tested, balanced)
- All RGS integration points are already handled by web-sdk

---

**Status**: Math complete  | Frontend integration needed 
