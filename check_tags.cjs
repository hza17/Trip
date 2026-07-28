const fs = require('fs');
const content = fs.readFileSync('src/components/SerpView.tsx', 'utf8');

const regex = /<\/?([A-Za-z0-9_.-]+)[^>]*>/g;
let match;
let stack = [];
let lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('return (') && i > 500) {
     console.log("Found return at line", i+1);
  }
}

while ((match = regex.exec(content)) !== null) {
  let tag = match[1];
  let isClosing = match[0].startsWith('</');
  let isSelfClosing = match[0].endsWith('/>');
  
  if (match[0].includes('return (')) continue; // rough 
  
  if (isSelfClosing) continue;
  
  // calculate line number
  let lineNo = content.substring(0, match.index).split('\n').length;
  
  if (!isClosing) {
    stack.push({tag, line: lineNo});
  } else {
    if (stack.length > 0 && stack[stack.length - 1].tag === tag) {
      stack.pop();
    } else {
      console.log(`Mismatch at line ${lineNo}: expected closing tag for ${stack.length > 0 ? stack[stack.length - 1].tag : 'NONE'}, but found </${tag}>`);
      // don't break, try to pop matching
      let found = false;
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === tag) {
          stack.splice(i, stack.length - i);
          found = true;
          break;
        }
      }
      if (!found) console.log(`  Unmatched closing tag: </${tag}>`);
    }
  }
  
  if (lineNo >= 1332 && lineNo <= 1342) {
    console.log(`Line ${lineNo}: ${match[0]} (Stack size: ${stack.length})`);
  }
}
console.log("Final stack:", stack);
