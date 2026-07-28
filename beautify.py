import re

def beautify_js(input_path, output_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        code = f.read()

    # Let's insert newlines at key boundaries to make it readable
    # e.g., after ;, after {, before }, and around JSX elements
    
    # 1. Newlines after semicolons
    code = code.replace(';', ';\n')
    
    # 2. Newlines around JSX calls
    code = re.sub(r'(n\.jsx|n\.jsxs)\(', r'\n\1(', code)
    
    # 3. Newlines after comma in properties (be careful, but let's do it for object literals in JSX)
    code = re.sub(r'className:\s*', r'\nclassName: ', code)
    code = re.sub(r'children:\s*', r'\nchildren: ', code)
    
    # 4. Save beautified file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(code)
    print("Beautified successfully!")

if __name__ == '__main__':
    beautify_js('hotelier_dashboard_component.js', 'beautified_dashboard.js')
