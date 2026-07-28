const fs = require('fs');

let content = fs.readFileSync('src/components/HomeView.tsx', 'utf8');

// Map various background and text colors to the primary theme (blue) or neutrals
const colorRegex = /\b(emerald|rose|teal|orange|amber|indigo|sky|purple|pink)-(50|100|200|300|400|500|600|700|800|900|950)\b/g;

content = content.replace(colorRegex, (match, color, shade) => {
  // Keep amber for Stars/Ratings (e.g., amber-400 or amber-500)
  if (color === 'amber' && (shade === '400' || shade === '500') && match.includes('amber')) {
    // If it's rating or something we could keep it, but let's just make it blue to be safe
    // Actually, just unify EVERYTHING to blue, except maybe white/black/slate
  }
  
  if (['50', '100', '200'].includes(shade)) {
    return 'blue-50'; // light background
  }
  if (['300', '400'].includes(shade)) {
    return 'blue-400'; // light text/borders
  }
  if (['500', '600'].includes(shade)) {
    return 'blue-600'; // primary text/bg
  }
  if (['700', '800', '900', '950'].includes(shade)) {
    return 'blue-700'; // dark text/bg
  }
  return `blue-${shade}`;
});

// Also fix some weights and sizes to match the professional look
content = content.replace(/font-black/g, 'font-bold');
content = content.replace(/font-extrabold/g, 'font-bold');

fs.writeFileSync('src/components/HomeView.tsx', content);
console.log('Colors simplified in HomeView.tsx');
