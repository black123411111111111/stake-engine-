import zstandard as zstd
import json

# Load source books
with open('games/eclipse_gods/library/books/books_base.json', 'r') as f:
    books = json.load(f)

print(f'Loaded {len(books)} base books')

# Compress to jsonl.zst
cctx = zstd.ZstdCompressor(level=3)
with open('games/eclipse_gods/library/publish_files/books_base.jsonl.zst', 'wb') as f:
    with cctx.stream_writer(f) as writer:
        for book in books:
            line = json.dumps(book) + '\n'
            writer.write(line.encode('utf-8'))

print('Successfully compressed books_base.jsonl.zst')
