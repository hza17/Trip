import re

with open('src/components/workspace/HotelPremiumDashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Current layout starts around <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2rem] w-full h-[calc(100vh-140px)] min-h-[600px] flex overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50 flex-col text-right" dir="rtl">

# I need to change `flex-col` to `flex-col md:flex-row`
content = content.replace(
    'flex-col text-right" dir="rtl"',
    'flex-col md:flex-row text-right" dir="rtl"'
)

# And I need to replace the tabs section and insert the sidebar.
# Let's find:
# {/* Sub tabs selector specific to the Premium Hotel Panel */}
# ...
# </div>
# {/* Main Dynamic Panel Body Area */}

tabs_section_pattern = re.compile(r'\{\/\*\s*Sub tabs selector specific to the Premium Hotel Panel\s*\*\/\}.*?\{\/\*\s*Main Dynamic Panel Body Area\s*\*\/\}', re.DOTALL)
match = tabs_section_pattern.search(content)
if match:
    # Instead of deleting, we will remove this top tabs bar completely.
    content = content[:match.start()] + '{/* Main Dynamic Panel Body Area */}' + content[match.end():]
    
    # Now we need to insert the aside BEFORE the main panel body, inside the main flex container.
    # Where does the main flex container start?
    
    # In the file, the top header (with Hotel Premium Panel and close button) is rendered before the tabs.
    # Wait, the wireframe has the header inside the aside? Or where is the close button?
    # Let's check how the wireframe handles the close button and header.
