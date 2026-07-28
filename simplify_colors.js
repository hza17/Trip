const fs = require('fs');

let content = fs.readFileSync('src/components/TripPlanner.tsx', 'utf8');

// The goal is to strip out the rainbow of colors and replace them with a unified professional palette.
// Let's replace 'bg-gradient-to-r from-emerald-600 via-teal-600 to-orange-500' -> 'bg-gradient-to-r from-blue-600 to-indigo-700'
content = content.replace(/from-emerald-\d+ via-teal-\d+ to-orange-\d+/g, 'from-blue-600 to-blue-800');
content = content.replace(/from-emerald-\d+ to-teal-\d+/g, 'from-blue-600 to-blue-700');
content = content.replace(/from-blue-\d+ to-blue-800 text-white/g, 'bg-blue-600 text-white');
content = content.replace(/from-slate-\d+ to-indigo-\d+/g, 'from-slate-900 to-slate-800');

// Map various background and text colors to the primary theme (blue) or neutrals
const colorRegex = /\b(emerald|rose|teal|orange|amber|indigo|sky|purple|pink)-(50|100|200|300|400|500|600|700|800|900|950)\b/g;

// Exceptions: we might want to keep amber for stars/ratings, and emerald for true success.
// But the user said "one color theme and style", "too many colors have been used, making it cluttered."
// So let's flatten most things.

content = content.replace(colorRegex, (match, color, shade) => {
  // Keep amber for Stars/Ratings (e.g., amber-400 or amber-500)
  if (color === 'amber' && (shade === '400' || shade === '500') && (content.substring(Math.max(0, content.indexOf(match) - 50), content.indexOf(match) + 50).includes('Star') || content.substring(Math.max(0, content.indexOf(match) - 50), content.indexOf(match) + 50).includes('rating') || content.substring(Math.max(0, content.indexOf(match) - 50), content.indexOf(match) + 50).includes('bg-amber-'))) {
    if (match === 'amber-500') return 'amber-400';
    return match;
  }
  
  // Keep rose/red for destructive actions? There aren't many.
  
  // Map shades to blue or slate
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

// We should also replace 'blue-50/10' or similar opacity modifiers if they look bad, but let's see.

// Some specific fixes:
content = content.replace(/bg-blue-50\/\d+/g, 'bg-blue-50');
content = content.replace(/dark:bg-blue-950\/\d+/g, 'dark:bg-slate-800');
content = content.replace(/dark:text-blue-400/g, 'dark:text-blue-400');
content = content.replace(/text-blue-600 dark:text-blue-400/g, 'text-blue-600 dark:text-blue-400');
content = content.replace(/bg-blue-500\/10 text-blue-600/g, 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400');

fs.writeFileSync('src/components/TripPlanner.tsx', content);
console.log('Colors simplified in TripPlanner.tsx');
