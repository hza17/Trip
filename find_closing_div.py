with open('temp_dashboard.tsx', 'r') as f:
    lines = f.readlines()
    
start_line = -1
for i, l in enumerate(lines):
    if "flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar relative" in l:
        start_line = i
        break
        
if start_line != -1:
    depth = 0
    for i in range(start_line, len(lines)):
        depth += lines[i].count('<div')
        depth -= lines[i].count('</div')
        if depth == 0:
            print("Closing div found at line:", i + 1)
            break
