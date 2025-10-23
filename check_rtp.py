"""Quick script to check RTP from optimized lookup tables."""
import csv

def check_rtp(mode):
    filepath = f'games/eclipse_gods/library/publish_files/lookUpTable_{mode}_0.csv'
    
    with open(filepath, 'r') as f:
        data = list(csv.reader(f))
    
    total_weight = sum(float(row[1]) for row in data)
    weighted_payout = sum(float(row[1]) * float(row[2]) for row in data)
    rtp = weighted_payout / total_weight
    
    print(f"\n{mode.upper()} Mode:")
    print(f"  Total Simulations: {len(data):,}")
    print(f"  Total Weight: {total_weight:,.0f}")
    print(f"  Weighted Payout: {weighted_payout:,.0f}")
    print(f"  RTP: {rtp:.6f} ({rtp*100:.4f}%)")
    print(f"  Target: 96.2000%")
    print(f"  Difference: {(rtp - 0.962)*100:+.4f}%")
    
    if abs(rtp - 0.962) < 0.005:
        print(f"  Status: ✅ EXCELLENT (within 0.5%)")
    elif abs(rtp - 0.962) < 0.01:
        print(f"  Status: ✅ GOOD (within 1%)")
    else:
        print(f"  Status: ❌ NEEDS ADJUSTMENT")
    
    return rtp

if __name__ == "__main__":
    print("=" * 60)
    print("Eclipse of the Gods - RTP Verification")
    print("=" * 60)
    
    base_rtp = check_rtp('base')
    bonus_rtp = check_rtp('bonus')
    
    print("\n" + "=" * 60)
    print("SUMMARY:")
    print(f"  Base Game RTP: {base_rtp*100:.4f}%")
    print(f"  Bonus Buy RTP: {bonus_rtp*100:.4f}%")
    print(f"  Target RTP: 96.2000%")
    print("=" * 60)
