import re

with open('wireframe.js', 'r', encoding='utf-8') as f:
    content = f.read()

matches = [m.start() for m in re.finditer(r'پنل هتل‌داران', content)]
print(f"Occurrences found: {len(matches)}")
for idx, pos in enumerate(matches):
    print(f"\n=== Occurrence {idx} at index {pos} ===")
    # Print 200 chars backward and 500 chars forward
    print("BACKWARD CONTEXT:")
    print(content[max(0, pos-400):pos])
    print("FORWARD CONTEXT:")
    print(content[pos:pos+600])
