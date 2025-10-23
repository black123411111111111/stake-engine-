import json

# Load bonus books
with open('games/eclipse_gods/library/books/books_bonus.json', 'r') as f:
    books = json.load(f)

print(f'Loaded {len(books)} bonus books')

# Create lookup table with each book as a row
# Format: ID, Probability (large integer), PayoutMultiplier
PROB_SCALE = 10**12  # Scale factor to convert probability to integer
total = len(books)
prob_per_book = PROB_SCALE // total

with open('games/eclipse_gods/library/publish_files/lookUpTable_bonus_0.csv', 'w') as f:
    for i, book in enumerate(books, 1):
        payout = book['payoutMultiplier']
        f.write(f"{i},{prob_per_book},{payout}\n")

print(f'Generated lookup table with {len(books)} rows')
print(f'Each book probability: {prob_per_book} (scaled)')
