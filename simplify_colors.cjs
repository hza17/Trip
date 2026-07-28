const fs = require('fs');

let content = fs.readFileSync('src/components/TripPlanner.tsx', 'utf8');

// The goal is to strip out the rainbow of colors and replace them with a unified professional palette.
content = content.replace(/from-emerald-\d+ via-teal-\d+ to-orange-\d+/g, 'from-blue-600 to-blue-800');
content = content.replace(/from-emerald-\d+ to-teal-\d+/g, 'from-blue-600 to-blue-700');
content = content.replace(/from-slate-\d+ to-indigo-\d+/g, 'from-slate-900 to-slate-800');

// Map various background and text colors to the primary theme (blue) or neutrals
const colorRegex = /\b(emerald|rose|teal|orange|amber|indigo|sky|purple|pink)-(50|100|200|300|400|500|600|700|800|900|950)\b/g;

content = content.replace(colorRegex, (match, color, shade) => {
  // Keep amber for Stars/Ratings (e.g., amber-400 or amber-500)
  if (color === 'amber' && (shade === '400' || shade === '500')) {
    return 'amber-400';
  }
  
  // Map shades to blue
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

content = content.replace(/bg-blue-50\/\d+/g, 'bg-blue-50');

fs.writeFileSync('src/components/TripPlanner.tsx', content);
console.log('Colors simplified in TripPlanner.tsx');
